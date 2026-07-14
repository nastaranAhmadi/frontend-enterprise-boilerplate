const joinClassNames = (...classes: Array<string | undefined | false>): string =>
  classes.filter(Boolean).join(' ');

export const TIME_CLOCK_ROOT_CLASS =
  'flex w-full items-stretch justify-center gap-sm rounded-md border border-border bg-background p-sm font-sans';

export const TIME_CLOCK_COLUMN_CLASS = 'flex min-w-[4.5rem] flex-1 flex-col gap-xs';

export const TIME_CLOCK_LABEL_CLASS = 'text-center text-xs font-medium text-muted-foreground';

export const TIME_CLOCK_LIST_CLASS =
  'flex max-h-48 flex-col gap-0.5 overflow-y-auto rounded-md border border-border p-xs sm:max-h-56';

export const TIME_CLOCK_OPTION_BASE_CLASS =
  'cursor-pointer rounded-md border-0 bg-transparent px-sm py-xs text-sm text-foreground transition-colors duration-normal hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary';

export const TIME_CLOCK_OPTION_SELECTED_CLASS =
  'bg-primary text-primary-foreground hover:bg-primary';

export const TIME_CLOCK_OPTION_DISABLED_CLASS =
  'cursor-not-allowed opacity-40 hover:bg-transparent';

export const TIME_CLOCK_PERIOD_CLASS = 'flex flex-col gap-xs';

export const getTimeClockRootClassName = ({ className }: { className?: string }): string =>
  joinClassNames(TIME_CLOCK_ROOT_CLASS, className);

export const getTimeClockOptionClassName = ({
  selected,
  disabled,
}: {
  selected: boolean;
  disabled: boolean;
}): string =>
  joinClassNames(
    TIME_CLOCK_OPTION_BASE_CLASS,
    selected && TIME_CLOCK_OPTION_SELECTED_CLASS,
    disabled && TIME_CLOCK_OPTION_DISABLED_CLASS,
  );
