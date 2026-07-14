import {
  createContext,
  type ElementType,
  forwardRef,
  type SyntheticEvent,
  useCallback,
  useContext,
  useId,
  useMemo,
  useState,
} from 'react';

import {
  ACCORDION_HEADING_CLASS,
  ACCORDION_REGION_INNER_CLASS,
  ACCORDION_SUMMARY_CONTENT_CLASS,
  getAccordionActionsClassName,
  getAccordionClassName,
  getAccordionDetailsClassName,
  getAccordionExpandIconClassName,
  getAccordionGroupClassName,
  getAccordionRegionClassName,
  getAccordionSummaryClassName,
} from './Accordion.styles';
import type {
  AccordionActionsProps,
  AccordionContextValue,
  AccordionDetailsProps,
  AccordionGroupProps,
  AccordionProps,
  AccordionSummaryProps,
} from './Accordion.types';

const AccordionContext = createContext<AccordionContextValue | null>(null);
const AccordionGroupContext = createContext(false);

const useAccordionContext = (): AccordionContextValue => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('Accordion compound components must be used within Accordion.');
  }
  return context;
};

const useControllableExpanded = ({
  expanded,
  defaultExpanded,
  onChange,
}: Pick<AccordionProps, 'expanded' | 'defaultExpanded' | 'onChange'>) => {
  const [uncontrolledExpanded, setUncontrolledExpanded] = useState(Boolean(defaultExpanded));
  const isControlled = expanded !== undefined;
  const isExpanded = isControlled ? expanded : uncontrolledExpanded;

  const setExpanded = useCallback(
    (event: SyntheticEvent, nextExpanded: boolean) => {
      if (!isControlled) {
        setUncontrolledExpanded(nextExpanded);
      }
      onChange?.(event, nextExpanded);
    },
    [isControlled, onChange],
  );

  return { isExpanded, setExpanded };
};

const DefaultExpandIcon = () => (
  <svg
    aria-hidden="true"
    fill="none"
    height="20"
    viewBox="0 0 20 20"
    width="20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 7.5 10 12.5 15 7.5"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
);

const AccordionRoot = forwardRef<HTMLDivElement, AccordionProps>(function Accordion(props, ref) {
  const {
    children,
    className,
    defaultExpanded = false,
    disabled = false,
    expanded,
    headingAs = 'h3',
    onChange,
    unmountOnExit = false,
    ...accordionProps
  } = props;

  const generatedHeaderId = useId();
  const generatedRegionId = useId();
  const grouped = useContext(AccordionGroupContext);
  const { isExpanded, setExpanded } = useControllableExpanded({
    defaultExpanded,
    expanded,
    onChange,
  });

  const toggle = useCallback(
    (event: SyntheticEvent) => {
      if (disabled) {
        return;
      }
      setExpanded(event, !isExpanded);
    },
    [disabled, isExpanded, setExpanded],
  );

  const contextValue = useMemo<AccordionContextValue>(
    () => ({
      disabled,
      expanded: isExpanded,
      grouped,
      headerId: generatedHeaderId,
      headingAs,
      regionId: generatedRegionId,
      toggle,
      unmountOnExit,
    }),
    [
      disabled,
      generatedHeaderId,
      generatedRegionId,
      grouped,
      headingAs,
      isExpanded,
      toggle,
      unmountOnExit,
    ],
  );

  return (
    <AccordionContext.Provider value={contextValue}>
      <div
        ref={ref}
        className={getAccordionClassName({ className, disabled, grouped })}
        data-expanded={isExpanded || undefined}
        {...accordionProps}
      >
        {children}
      </div>
    </AccordionContext.Provider>
  );
});

export const AccordionSummary = forwardRef<HTMLButtonElement, AccordionSummaryProps>(
  function AccordionSummary(props, ref) {
    const {
      'aria-controls': ariaControlsProp,
      children,
      className,
      expandIcon,
      id: idProp,
      onClick,
      ...summaryProps
    } = props;

    const { disabled, expanded, headerId, headingAs, regionId, toggle } = useAccordionContext();
    const Heading = headingAs as ElementType<{ className?: string }>;
    const headerIdValue = idProp ?? headerId;
    const regionIdValue = ariaControlsProp ?? regionId;

    return (
      <Heading className={ACCORDION_HEADING_CLASS}>
        <button
          ref={ref}
          type="button"
          id={headerIdValue}
          className={getAccordionSummaryClassName({ className })}
          aria-expanded={expanded}
          aria-controls={regionIdValue}
          disabled={disabled}
          onClick={(event) => {
            onClick?.(event);
            if (!event.defaultPrevented) {
              toggle(event);
            }
          }}
          {...summaryProps}
        >
          <span className={ACCORDION_SUMMARY_CONTENT_CLASS}>{children}</span>
          <span className={getAccordionExpandIconClassName({ expanded })}>
            {expandIcon ?? <DefaultExpandIcon />}
          </span>
        </button>
      </Heading>
    );
  },
);

AccordionSummary.displayName = 'AccordionSummary';

export const AccordionDetails = forwardRef<HTMLDivElement, AccordionDetailsProps>(
  function AccordionDetails(props, ref) {
    const { children, className, ...detailsProps } = props;
    const { expanded, headerId, regionId, unmountOnExit } = useAccordionContext();
    const shouldRenderContent = expanded || !unmountOnExit;

    return (
      <div
        id={regionId}
        role="region"
        aria-labelledby={headerId}
        aria-hidden={!expanded}
        className={getAccordionRegionClassName({ expanded })}
      >
        <div className={ACCORDION_REGION_INNER_CLASS}>
          <div
            ref={ref}
            className={getAccordionDetailsClassName({ className })}
            hidden={!expanded && unmountOnExit}
            {...detailsProps}
          >
            {shouldRenderContent ? children : null}
          </div>
        </div>
      </div>
    );
  },
);

AccordionDetails.displayName = 'AccordionDetails';

export const AccordionActions = forwardRef<HTMLDivElement, AccordionActionsProps>(
  function AccordionActions(props, ref) {
    const { children, className, disableSpacing = false, ...actionsProps } = props;
    const { expanded } = useAccordionContext();

    if (!expanded) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={getAccordionActionsClassName({ className, disableSpacing })}
        {...actionsProps}
      >
        {children}
      </div>
    );
  },
);

AccordionActions.displayName = 'AccordionActions';

export const AccordionGroup = forwardRef<HTMLDivElement, AccordionGroupProps>(
  function AccordionGroup(props, ref) {
    const { children, className, ...groupProps } = props;

    return (
      <AccordionGroupContext.Provider value>
        <div ref={ref} className={getAccordionGroupClassName({ className })} {...groupProps}>
          {children}
        </div>
      </AccordionGroupContext.Provider>
    );
  },
);

AccordionGroup.displayName = 'AccordionGroup';

export const Accordion = Object.assign(AccordionRoot, {
  Actions: AccordionActions,
  Details: AccordionDetails,
  Group: AccordionGroup,
  Summary: AccordionSummary,
});
