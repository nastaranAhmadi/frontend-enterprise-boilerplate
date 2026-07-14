import type {
  AccordionActionsProps,
  AccordionDetailsProps,
  AccordionGroupProps,
  AccordionProps,
  AccordionSummaryProps,
} from './Accordion.types';

const joinClassNames = (...classes: Array<string | undefined | false>): string =>
  classes.filter(Boolean).join(' ');

export const ACCORDION_BASE_CLASS =
  'bg-background font-sans text-foreground transition-shadow duration-normal';

export const ACCORDION_STANDALONE_CLASS = 'rounded-md border border-border shadow-sm';

export const ACCORDION_GROUPED_CLASS = 'border-0 rounded-none shadow-none';

export const ACCORDION_DISABLED_CLASS = 'opacity-60';

export const ACCORDION_HEADING_CLASS = 'm-0';

export const ACCORDION_SUMMARY_BASE_CLASS =
  'flex w-full items-center gap-sm px-md py-md text-start font-medium text-foreground transition-colors duration-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset disabled:cursor-not-allowed';

export const ACCORDION_SUMMARY_CONTENT_CLASS = 'flex min-w-0 flex-1 items-center gap-sm';

export const ACCORDION_EXPAND_ICON_CLASS =
  'inline-flex shrink-0 text-muted transition-transform duration-normal';

export const ACCORDION_EXPAND_ICON_EXPANDED_CLASS = 'rotate-180';

export const ACCORDION_REGION_CLASS =
  'grid transition-[grid-template-rows] duration-normal ease-in-out motion-reduce:transition-none';

export const ACCORDION_REGION_EXPANDED_CLASS = 'grid-rows-[1fr]';

export const ACCORDION_REGION_COLLAPSED_CLASS = 'grid-rows-[0fr]';

export const ACCORDION_REGION_INNER_CLASS = 'overflow-hidden';

export const ACCORDION_DETAILS_CLASS = 'px-md pb-md text-sm text-foreground';

export const ACCORDION_ACTIONS_BASE_CLASS =
  'flex flex-wrap items-center border-t border-border px-md py-sm';

export const ACCORDION_ACTIONS_SPACING_CLASS = 'gap-sm';

export const ACCORDION_GROUP_CLASS =
  'overflow-hidden rounded-md border border-border bg-background divide-y divide-border';

export const getAccordionClassName = ({
  className,
  disabled,
  grouped,
}: Pick<AccordionProps, 'className' | 'disabled'> & {
  grouped?: boolean;
}): string =>
  joinClassNames(
    ACCORDION_BASE_CLASS,
    grouped ? ACCORDION_GROUPED_CLASS : ACCORDION_STANDALONE_CLASS,
    disabled && ACCORDION_DISABLED_CLASS,
    className,
  );

export const getAccordionSummaryClassName = ({
  className,
}: Pick<AccordionSummaryProps, 'className'> = {}): string =>
  joinClassNames(ACCORDION_SUMMARY_BASE_CLASS, className);

export const getAccordionExpandIconClassName = ({ expanded }: { expanded: boolean }): string =>
  joinClassNames(ACCORDION_EXPAND_ICON_CLASS, expanded && ACCORDION_EXPAND_ICON_EXPANDED_CLASS);

export const getAccordionRegionClassName = ({ expanded }: { expanded: boolean }): string =>
  joinClassNames(
    ACCORDION_REGION_CLASS,
    expanded ? ACCORDION_REGION_EXPANDED_CLASS : ACCORDION_REGION_COLLAPSED_CLASS,
  );

export const getAccordionDetailsClassName = ({
  className,
}: Pick<AccordionDetailsProps, 'className'> = {}): string =>
  joinClassNames(ACCORDION_DETAILS_CLASS, className);

export const getAccordionActionsClassName = ({
  className,
  disableSpacing,
}: Pick<AccordionActionsProps, 'className' | 'disableSpacing'> = {}): string =>
  joinClassNames(
    ACCORDION_ACTIONS_BASE_CLASS,
    !disableSpacing && ACCORDION_ACTIONS_SPACING_CLASS,
    className,
  );

export const getAccordionGroupClassName = ({
  className,
}: Pick<AccordionGroupProps, 'className'> = {}): string =>
  joinClassNames(ACCORDION_GROUP_CLASS, className);
