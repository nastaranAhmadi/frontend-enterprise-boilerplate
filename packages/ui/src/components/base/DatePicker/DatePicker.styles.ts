import type { DatePickerProps } from './DatePicker.types';

type DatePickerSize = NonNullable<DatePickerProps['size']>;

const joinClassNames = (...classes: Array<string | undefined | false>): string =>
  classes.filter(Boolean).join(' ');

export const DATE_PICKER_ROOT_CLASS = 'relative inline-flex w-full flex-col font-sans';

export const DATE_PICKER_TRIGGER_CLASS =
  'inline-flex w-full min-w-0 cursor-pointer items-center gap-xs transition-colors duration-normal focus-within:ring-2';

export const DATE_PICKER_INPUT_CLASS =
  'min-w-0 flex-1 cursor-pointer bg-transparent font-inherit text-inherit placeholder:text-muted focus:outline-none';

export const DATE_PICKER_ICON_BUTTON_CLASS =
  'inline-flex shrink-0 items-center justify-center text-muted';

export const DATE_PICKER_PANEL_CLASS =
  'absolute start-0 top-[calc(100%+0.25rem)] z-dropdown w-full min-w-[17.5rem] sm:w-auto';

export const DATE_PICKER_ACTIONS_CLASS =
  'flex items-center justify-between gap-sm border-t border-border px-sm py-sm sm:px-md';

export const DATE_PICKER_ACTION_BUTTON_CLASS =
  'cursor-pointer border-0 bg-transparent px-sm py-xs text-sm font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50';

const TRIGGER_SIZE_CLASS_MAP: Record<DatePickerSize, string> = {
  small: 'px-sm py-xs text-sm',
  medium: 'px-md py-sm text-md',
  large: 'px-lg py-md text-lg',
};

const VARIANT_CLASS = 'rounded-md border border-border bg-background focus-within:ring-primary';

const INVALID_CLASS = 'border-error focus-within:ring-error';

export const getDatePickerRootClassName = ({ className }: { className?: string }): string =>
  joinClassNames(DATE_PICKER_ROOT_CLASS, className);

export const getDatePickerTriggerClassName = ({
  size,
  invalid,
  disabled,
  readOnly,
}: Pick<DatePickerProps, 'size' | 'invalid' | 'disabled' | 'readOnly'>): string =>
  joinClassNames(
    DATE_PICKER_TRIGGER_CLASS,
    VARIANT_CLASS,
    TRIGGER_SIZE_CLASS_MAP[size === 'small' || size === 'large' ? size : 'medium'],
    invalid && INVALID_CLASS,
    (disabled || readOnly) && 'cursor-not-allowed opacity-50',
  );

export const getDatePickerPanelClassName = (): string => DATE_PICKER_PANEL_CLASS;
