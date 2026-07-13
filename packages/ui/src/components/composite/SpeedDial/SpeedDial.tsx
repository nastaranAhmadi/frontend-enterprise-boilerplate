import {
  Children,
  createContext,
  forwardRef,
  isValidElement,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactElement,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';

import { FloatingButton } from '../../base/FloatingButton';
import {
  getSpeedDialActionButtonClassName,
  getSpeedDialActionRowClassName,
  getSpeedDialActionsClassName,
  getSpeedDialMenuOrientation,
  getSpeedDialNavigationKeys,
  getSpeedDialRootClassName,
  getSpeedDialTooltipClassName,
  SPEED_DIAL_BACKDROP_CLASS,
} from './SpeedDial.styles';
import type { SpeedDialActionProps, SpeedDialProps } from './SpeedDial.types';

interface SpeedDialContextValue {
  color?: SpeedDialProps['color'];
  tooltipOpen?: boolean;
  closeMenu: () => void;
}

const SpeedDialContext = createContext<SpeedDialContextValue | null>(null);

const useSpeedDialContext = (): SpeedDialContextValue => {
  const context = useContext(SpeedDialContext);
  if (!context) {
    throw new Error('SpeedDial.Action must be used within SpeedDial.');
  }
  return context;
};

const useControllableOpen = ({
  open,
  defaultOpen,
  onOpenChange,
}: Pick<SpeedDialProps, 'open' | 'defaultOpen' | 'onOpenChange'>) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(Boolean(defaultOpen));
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : uncontrolledOpen;

  const setOpen = useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(nextOpen);
      }
      onOpenChange?.(nextOpen);
    },
    [isControlled, onOpenChange],
  );

  return { isOpen, setOpen };
};

const getEnabledMenuItems = (menu: HTMLElement): HTMLElement[] =>
  Array.from(menu.querySelectorAll<HTMLElement>('[role="menuitem"]:not([disabled])'));

const focusMenuItemAt = (menu: HTMLElement, index: number): void => {
  const items = getEnabledMenuItems(menu);
  if (items.length === 0) return;

  const wrappedIndex = ((index % items.length) + items.length) % items.length;
  items[wrappedIndex]?.focus();
};

const DefaultOpenIcon = () => <span aria-hidden="true">+</span>;
const DefaultCloseIcon = () => <span aria-hidden="true">×</span>;

const isSpeedDialActionElement = (
  child: ReactElement,
): child is ReactElement<SpeedDialActionProps> => {
  if (child.type === SpeedDialAction) {
    return true;
  }

  const componentType = child.type as { displayName?: string };
  return componentType.displayName === SpeedDialAction.displayName;
};

const collectActions = (children: ReactNode): ReactElement<SpeedDialActionProps>[] => {
  const actions: ReactElement<SpeedDialActionProps>[] = [];

  Children.forEach(children, (child) => {
    if (!isValidElement(child)) return;
    if (isSpeedDialActionElement(child)) {
      actions.push(child);
    }
  });

  return actions;
};

export const SpeedDial = forwardRef<HTMLDivElement, SpeedDialProps>(function SpeedDial(props, ref) {
  const {
    children,
    className,
    direction = 'up',
    disabled = false,
    open,
    defaultOpen,
    onOpenChange,
    'aria-label': ariaLabel,
    icon,
    openIcon,
    color = 'primary',
    size = 'large',
    tooltipOpen = false,
    ...speedDialProps
  } = props;

  const menuId = useId();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const { isOpen, setOpen } = useControllableOpen({ open, defaultOpen, onOpenChange });
  const actions = collectActions(children);
  const navigationKeys = getSpeedDialNavigationKeys(direction);

  const closeMenu = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const toggleMenu = useCallback(() => {
    if (disabled) return;
    setOpen(!isOpen);
  }, [disabled, isOpen, setOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const menu = menuRef.current;
    if (menu) {
      focusMenuItemAt(menu, 0);
    }

    const handlePointerDown = (event: Event) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        closeMenu();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeMenu, isOpen]);

  const handleMenuKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    const menu = menuRef.current;
    if (!menu) return;

    const items = getEnabledMenuItems(menu);
    if (items.length === 0) return;

    const currentIndex = items.indexOf(document.activeElement as HTMLElement);

    switch (event.key) {
      case navigationKeys.next:
        event.preventDefault();
        focusMenuItemAt(menu, currentIndex + 1);
        break;
      case navigationKeys.previous:
        event.preventDefault();
        focusMenuItemAt(menu, currentIndex - 1);
        break;
      case 'Home':
        event.preventDefault();
        focusMenuItemAt(menu, 0);
        break;
      case 'End':
        event.preventDefault();
        focusMenuItemAt(menu, items.length - 1);
        break;
      default:
        break;
    }
  };

  const setRefs = (node: HTMLDivElement | null) => {
    rootRef.current = node;
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  };

  return (
    <div {...speedDialProps} ref={setRefs} className={getSpeedDialRootClassName({ className })}>
      {isOpen ? (
        <button
          type="button"
          aria-label="Close speed dial"
          className={SPEED_DIAL_BACKDROP_CLASS}
          tabIndex={-1}
          onClick={closeMenu}
        />
      ) : null}

      {isOpen ? (
        <SpeedDialContext.Provider value={{ color, tooltipOpen, closeMenu }}>
          <div
            id={menuId}
            ref={menuRef}
            role="menu"
            tabIndex={0}
            aria-orientation={getSpeedDialMenuOrientation(direction)}
            onKeyDown={handleMenuKeyDown}
            className={getSpeedDialActionsClassName({ direction })}
          >
            {actions}
          </div>
        </SpeedDialContext.Provider>
      ) : null}

      <FloatingButton
        type="button"
        color={color}
        size={size}
        aria-label={ariaLabel}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-controls={isOpen ? menuId : undefined}
        disabled={disabled}
        icon={isOpen ? (openIcon ?? <DefaultCloseIcon />) : (icon ?? <DefaultOpenIcon />)}
        onClick={toggleMenu}
      />
    </div>
  );
});

SpeedDial.displayName = 'SpeedDial';

export const SpeedDialAction = forwardRef<HTMLButtonElement, SpeedDialActionProps>(
  function SpeedDialAction(props, ref) {
    const { icon, tooltip, className, disabled, onClick, type, ...actionProps } = props;
    const { tooltipOpen, closeMenu } = useSpeedDialContext();
    const tooltipId = useId();

    return (
      <div role="none" className={getSpeedDialActionRowClassName()}>
        {tooltipOpen ? (
          <span id={tooltipId} role="tooltip" className={getSpeedDialTooltipClassName()}>
            {tooltip}
          </span>
        ) : null}
        <button
          {...actionProps}
          ref={ref}
          type={type ?? 'button'}
          role="menuitem"
          aria-label={tooltip}
          aria-describedby={tooltipOpen ? tooltipId : undefined}
          disabled={disabled}
          className={getSpeedDialActionButtonClassName({ className })}
          onClick={(event) => {
            onClick?.(event);
            if (!disabled) {
              closeMenu();
            }
          }}
        >
          <span aria-hidden="true" className="inline-flex h-4 w-4 items-center justify-center">
            {icon}
          </span>
        </button>
      </div>
    );
  },
);

SpeedDialAction.displayName = 'SpeedDialAction';
