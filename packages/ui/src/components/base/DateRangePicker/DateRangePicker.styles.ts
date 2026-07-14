const joinClassNames = (...classes: Array<string | undefined | false>): string =>
  classes.filter(Boolean).join(' ');

export const DATE_RANGE_PICKER_PANEL_CLASS =
  'absolute start-0 top-[calc(100%+0.25rem)] z-dropdown flex w-full min-w-[17.5rem] flex-col overflow-hidden rounded-md border border-border bg-background shadow-md sm:min-w-[36rem] sm:flex-row';

export const DATE_RANGE_PRESETS_CLASS =
  'flex shrink-0 flex-col gap-0.5 border-b border-border p-sm sm:max-w-[10rem] sm:border-b-0 sm:border-e';

export const DATE_RANGE_PRESET_BUTTON_CLASS =
  'cursor-pointer rounded-md border-0 bg-transparent px-sm py-xs text-start text-sm text-foreground transition-colors duration-normal hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary';

export const DATE_RANGE_PRESET_BUTTON_SELECTED_CLASS = 'bg-muted font-medium';

export const DATE_RANGE_CALENDAR_CLASS = 'min-w-0 flex-1';

export const getDateRangePresetButtonClassName = ({ selected }: { selected: boolean }): string =>
  joinClassNames(
    DATE_RANGE_PRESET_BUTTON_CLASS,
    selected && DATE_RANGE_PRESET_BUTTON_SELECTED_CLASS,
  );
