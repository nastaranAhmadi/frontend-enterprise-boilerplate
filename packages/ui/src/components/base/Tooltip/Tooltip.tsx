import {
  Children,
  cloneElement,
  type FocusEvent,
  isValidElement,
  type MouseEvent,
  type ReactElement,
  type Ref,
  type TouchEvent,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

import {
  computeTooltipPosition,
  getTooltipArrowStyle,
  getTooltipPopperStyle,
} from './Tooltip.position';
import {
  getTooltipArrowClassName,
  getTooltipPopperClassName,
  getTooltipTriggerWrapperClassName,
  normalizePlacement,
} from './Tooltip.styles';
import type { TooltipProps } from './Tooltip.types';

const setRef = <T,>(ref: Ref<T> | undefined, value: T | null): void => {
  if (typeof ref === 'function') {
    ref(value);
    return;
  }
  if (ref && typeof ref === 'object') {
    (ref as { current: T | null }).current = value;
  }
};

const composeRefs =
  <T,>(...refs: Array<Ref<T> | undefined>) =>
  (value: T | null) => {
    refs.forEach((ref) => { setRef(ref, value); });
  };

const isDisabledElement = (child: ReactElement): boolean => {
  const props = child.props as { disabled?: boolean };
  return Boolean(props.disabled);
};

const mergeHandler = <E,>(
  theirs: ((event: E) => void) | undefined,
  ours: (event: E) => void,
): ((event: E) => void) => {
  return (event) => {
    theirs?.(event);
    ours(event);
  };
};

export const Tooltip = function Tooltip(props: TooltipProps) {
  const {
    arrow = false,
    children,
    describeChild = false,
    disableFocusListener = false,
    disableHoverListener = false,
    disableInteractive = false,
    disableTouchListener = false,
    enterDelay = 100,
    enterTouchDelay = 700,
    leaveDelay = 0,
    leaveTouchDelay = 1500,
    onClose,
    onOpen,
    open,
    placement = 'bottom',
    title,
    tooltipClassName,
  } = props;

  const tooltipId = useId();
  const anchorRef = useRef<HTMLElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const enterTimerRef = useRef<number | undefined>(undefined);
  const leaveTimerRef = useRef<number | undefined>(undefined);
  const touchTimerRef = useRef<number | undefined>(undefined);
  const isTouchRef = useRef(false);

  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const isControlled = open !== undefined;
  const isOpen = Boolean(title) && (isControlled ? open : uncontrolledOpen);
  const resolvedPlacement = normalizePlacement(placement);

  const clearTimers = useCallback(() => {
    if (enterTimerRef.current !== undefined) {
      window.clearTimeout(enterTimerRef.current);
      enterTimerRef.current = undefined;
    }
    if (leaveTimerRef.current !== undefined) {
      window.clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = undefined;
    }
    if (touchTimerRef.current !== undefined) {
      window.clearTimeout(touchTimerRef.current);
      touchTimerRef.current = undefined;
    }
  }, []);

  const setOpenState = useCallback(
    (nextOpen: boolean, event?: Event) => {
      if (!title) return;

      if (!isControlled) {
        setUncontrolledOpen(nextOpen);
      }

      if (nextOpen) {
        onOpen?.(event);
      } else {
        onClose?.(event);
      }
    },
    [isControlled, onClose, onOpen, title],
  );

  const scheduleOpen = useCallback(
    (event?: Event, delay = enterDelay) => {
      clearTimers();
      enterTimerRef.current = window.setTimeout(() => {
        setOpenState(true, event);
      }, delay);
    },
    [clearTimers, enterDelay, setOpenState],
  );

  const scheduleClose = useCallback(
    (event?: Event, delay = leaveDelay) => {
      clearTimers();
      leaveTimerRef.current = window.setTimeout(() => {
        setOpenState(false, event);
      }, delay);
    },
    [clearTimers, leaveDelay, setOpenState],
  );

  const updatePosition = useCallback(() => {
    const anchor = anchorRef.current;
    const tooltip = tooltipRef.current;
    if (!anchor || !tooltip) return;

    const nextPosition = computeTooltipPosition({
      anchorRect: anchor.getBoundingClientRect(),
      tooltipRect: tooltip.getBoundingClientRect(),
      placement: resolvedPlacement,
    });

    setPosition(nextPosition);
  }, [resolvedPlacement]);

  useLayoutEffect(() => {
    if (!isOpen) return;
    updatePosition();
  }, [isOpen, resolvedPlacement, title, updatePosition]);

  useEffect(() => {
    if (!isOpen) return;

    const handleReposition = () => {
      updatePosition();
    };

    window.addEventListener('resize', handleReposition);
    window.addEventListener('scroll', handleReposition, true);

    return () => {
      window.removeEventListener('resize', handleReposition);
      window.removeEventListener('scroll', handleReposition, true);
    };
  }, [isOpen, updatePosition]);

  useEffect(() => clearTimers, [clearTimers]);

  const handleMouseEnter = (event: MouseEvent<HTMLElement>) => {
    if (disableHoverListener || isTouchRef.current) return;
    scheduleOpen(event.nativeEvent);
  };

  const handleMouseLeave = (event: MouseEvent<HTMLElement>) => {
    if (disableHoverListener || isTouchRef.current) return;
    scheduleClose(event.nativeEvent);
  };

  const handleFocus = (event: FocusEvent<HTMLElement>) => {
    if (disableFocusListener) return;
    scheduleOpen(event.nativeEvent, 0);
  };

  const handleBlur = (event: FocusEvent<HTMLElement>) => {
    if (disableFocusListener) return;
    scheduleClose(event.nativeEvent, 0);
  };

  const handleTouchStart = (event: TouchEvent<HTMLElement>) => {
    if (disableTouchListener) return;
    isTouchRef.current = true;
    scheduleOpen(event.nativeEvent, enterTouchDelay);
  };

  const handleTouchEnd = (event: TouchEvent<HTMLElement>) => {
    if (disableTouchListener) return;
    scheduleClose(event.nativeEvent, leaveTouchDelay);
    window.setTimeout(() => {
      isTouchRef.current = false;
    }, 300);
  };

  const handleTooltipMouseEnter = (event: MouseEvent<HTMLDivElement>) => {
    if (disableInteractive) return;
    clearTimers();
    setOpenState(true, event.nativeEvent);
  };

  const handleTooltipMouseLeave = (event: MouseEvent<HTMLDivElement>) => {
    if (disableInteractive) return;
    scheduleClose(event.nativeEvent);
  };

  const child = Children.only(children);
  if (!isValidElement(child)) {
    throw new Error('Tooltip expects a single valid React element child.');
  }

  const childProps = child.props as Record<string, unknown> & { ref?: Ref<HTMLElement> };
  const childRef = childProps.ref;
  const disabled = isDisabledElement(child);

  const accessibilityProps = title
    ? describeChild
      ? { 'aria-describedby': isOpen ? tooltipId : undefined }
      : { 'aria-labelledby': isOpen ? tooltipId : undefined }
    : {};

  const triggerHandlers = {
    onMouseEnter: mergeHandler(
      childProps.onMouseEnter as ((event: MouseEvent<HTMLElement>) => void) | undefined,
      handleMouseEnter,
    ),
    onMouseLeave: mergeHandler(
      childProps.onMouseLeave as ((event: MouseEvent<HTMLElement>) => void) | undefined,
      handleMouseLeave,
    ),
    onFocus: mergeHandler(
      childProps.onFocus as ((event: FocusEvent<HTMLElement>) => void) | undefined,
      handleFocus,
    ),
    onBlur: mergeHandler(
      childProps.onBlur as ((event: FocusEvent<HTMLElement>) => void) | undefined,
      handleBlur,
    ),
    onTouchStart: mergeHandler(
      childProps.onTouchStart as ((event: TouchEvent<HTMLElement>) => void) | undefined,
      handleTouchStart,
    ),
    onTouchEnd: mergeHandler(
      childProps.onTouchEnd as ((event: TouchEvent<HTMLElement>) => void) | undefined,
      handleTouchEnd,
    ),
  };

  const trigger = disabled ? (
    <span
      className={getTooltipTriggerWrapperClassName()}
      {...accessibilityProps}
      {...triggerHandlers}
      ref={composeRefs(anchorRef)}
    >
      {child}
    </span>
  ) : (
    cloneElement(child, {
      ...accessibilityProps,
      ...triggerHandlers,
      ref: composeRefs(childRef, anchorRef),
    } as Record<string, unknown>)
  );

  const tooltipNode =
    isOpen && typeof document !== 'undefined'
      ? createPortal(
          <div
            id={tooltipId}
            ref={tooltipRef}
            role="tooltip"
            style={getTooltipPopperStyle(position)}
            className={getTooltipPopperClassName({ className: tooltipClassName })}
            onMouseEnter={handleTooltipMouseEnter}
            onMouseLeave={handleTooltipMouseLeave}
          >
            {title}
            {arrow ? (
              <span
                aria-hidden="true"
                className={getTooltipArrowClassName()}
                style={getTooltipArrowStyle(resolvedPlacement)}
              />
            ) : null}
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      {trigger}
      {tooltipNode}
    </>
  );
};

Tooltip.displayName = 'Tooltip';
