import type { CalendarProps } from './Calendar.types';

type CalendarSize = NonNullable<CalendarProps['size']>;

const joinClassNames = (...classes: Array<string | undefined | false>): string =>
  classes.filter(Boolean).join(' ');

export const CALENDAR_ROOT_CLASS =
  'w-full min-w-[17.5rem] max-w-full rounded-md border border-border bg-surface-elevated p-sm font-sans shadow-md sm:min-w-[20rem] sm:p-md';

export const CALENDAR_HEADER_CLASS = 'mb-sm flex items-center justify-between gap-xs';

export const CALENDAR_NAV_BUTTON_CLASS =
  'inline-flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-md border-0 bg-transparent text-muted-foreground transition-colors duration-normal hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50';

export const CALENDAR_TITLE_CLASS =
  'flex-1 text-center text-sm font-semibold text-foreground sm:text-md';

export const CALENDAR_GRID_CLASS = 'w-full border-collapse';

export const CALENDAR_WEEKDAY_ROW_CLASS = 'mb-xs';

export const CALENDAR_WEEKDAY_CELL_CLASS =
  'pb-xs text-center text-xs font-medium text-muted-foreground sm:text-sm';

export const CALENDAR_DAY_CELL_WRAPPER_CLASS = 'p-0.5 text-center';

export const CALENDAR_DAY_BUTTON_BASE_CLASS =
  'inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border-0 bg-transparent text-sm transition-colors duration-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:h-10 sm:w-10';

export const CALENDAR_DAY_OUTSIDE_CLASS = 'text-muted-foreground/60';

export const CALENDAR_DAY_TODAY_CLASS = 'font-semibold text-primary';

export const CALENDAR_DAY_SELECTED_CLASS = 'bg-primary text-primary-foreground hover:bg-primary';

export const CALENDAR_DAY_DISABLED_CLASS = 'cursor-not-allowed opacity-40 hover:bg-transparent';

export const CALENDAR_DAY_FOCUSED_CLASS = 'ring-2 ring-primary ring-offset-1';

export const CALENDAR_FOOTER_CLASS = 'mt-sm flex justify-center border-t border-border pt-sm';

export const CALENDAR_TODAY_BUTTON_CLASS =
  'cursor-pointer border-0 bg-transparent px-sm py-xs text-sm font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary';

const SIZE_CLASS_MAP: Record<CalendarSize, string> = {
  small: 'text-sm',
  medium: 'text-md',
  large: 'text-lg',
};

export const getCalendarRootClassName = ({
  className,
  size,
}: {
  className?: string;
  size?: CalendarProps['size'];
}): string =>
  joinClassNames(
    CALENDAR_ROOT_CLASS,
    size ? SIZE_CLASS_MAP[size] : SIZE_CLASS_MAP.medium,
    className,
  );

export const CALENDAR_DAY_IN_RANGE_CLASS = 'rounded-none bg-primary/15 text-foreground';

export const CALENDAR_DAY_RANGE_START_CLASS =
  'rounded-e-none bg-primary text-primary-foreground hover:bg-primary';

export const CALENDAR_DAY_RANGE_END_CLASS =
  'rounded-s-none bg-primary text-primary-foreground hover:bg-primary';

export const getCalendarDayButtonClassName = ({
  isCurrentMonth,
  isToday,
  isSelected,
  isDisabled,
  isFocused,
  isInRange = false,
  isRangeEnd = false,
  isRangeStart = false,
}: {
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isDisabled: boolean;
  isFocused: boolean;
  isInRange?: boolean;
  isRangeEnd?: boolean;
  isRangeStart?: boolean;
}): string => {
  const isRangeEdge = isRangeStart || isRangeEnd;

  return joinClassNames(
    CALENDAR_DAY_BUTTON_BASE_CLASS,
    !isCurrentMonth && CALENDAR_DAY_OUTSIDE_CLASS,
    isToday && !isSelected && !isRangeEdge && CALENDAR_DAY_TODAY_CLASS,
    isSelected && !isRangeEdge && CALENDAR_DAY_SELECTED_CLASS,
    isInRange && CALENDAR_DAY_IN_RANGE_CLASS,
    isRangeStart && CALENDAR_DAY_RANGE_START_CLASS,
    isRangeEnd && CALENDAR_DAY_RANGE_END_CLASS,
    isDisabled && CALENDAR_DAY_DISABLED_CLASS,
    isFocused && !isSelected && !isRangeEdge && CALENDAR_DAY_FOCUSED_CLASS,
  );
};
