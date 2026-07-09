import type { CheckboxProps } from './Checkbox.types';

type CheckboxSize = NonNullable<CheckboxProps['size']>;

export const ROOT_CLASS = 'inline-flex shrink-0';

export const CHECKBOX_BASE_CLASS =
  'rounded-sm border border-border bg-background text-primary accent-primary transition-colors duration-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';

const SIZE_CLASS_MAP: Record<CheckboxSize, string> = {
  small: 'h-3.5 w-3.5',
  medium: 'h-4 w-4',
  large: 'h-5 w-5',
};

const FOCUS_RING_CLASS = 'focus-visible:ring-primary';
const INVALID_FOCUS_RING_CLASS = 'focus-visible:ring-error';
const INVALID_BORDER_CLASS = 'border-error';

const joinClassNames = (...classes: Array<string | undefined | false>): string =>
  classes.filter(Boolean).join(' ');

const normalizeSize = (size: CheckboxProps['size']): CheckboxSize => {
  if (size === 'small') return 'small';
  if (size === 'large') return 'large';
  return 'medium';
};

const stateClasses = (invalid?: boolean): string =>
  joinClassNames(
    invalid ? INVALID_FOCUS_RING_CLASS : FOCUS_RING_CLASS,
    invalid && INVALID_BORDER_CLASS,
  );

export const getRootClassName = ({ className }: { className?: string }): string =>
  joinClassNames(ROOT_CLASS, className);

export const getCheckboxClassName = ({
  size,
  invalid,
}: Pick<CheckboxProps, 'size' | 'invalid'>): string =>
  joinClassNames(CHECKBOX_BASE_CLASS, SIZE_CLASS_MAP[normalizeSize(size)], stateClasses(invalid));
