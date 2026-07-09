import type { SelectProps, SelectVariant } from './Select.types';

type SelectSize = NonNullable<SelectProps['size']>;

export const ROOT_CLASS = 'inline-flex w-full flex-col font-sans';

export const CONTROL_BASE_CLASS =
  'inline-flex w-full min-w-0 items-center gap-xs transition-colors duration-normal focus-within:ring-2';

export const SELECT_BASE_CLASS =
  'min-w-0 flex-1 cursor-pointer bg-transparent font-inherit text-inherit focus:outline-none disabled:cursor-not-allowed disabled:opacity-50';

export const ADORNMENT_CLASS = 'inline-flex shrink-0 items-center text-muted';

const CONTROL_SIZE_CLASS_MAP: Record<SelectSize, string> = {
  small: 'px-sm py-xs',
  medium: 'px-md py-sm',
  large: 'px-lg py-md',
};

const TEXT_SIZE_CLASS_MAP: Record<SelectSize, string> = {
  small: 'text-sm',
  medium: 'text-md',
  large: 'text-lg',
};

const VARIANT_CLASS_MAP: Record<SelectVariant, string> = {
  filled: 'rounded-md border border-transparent bg-muted',
  outlined: 'rounded-md border border-border bg-background',
  standard: 'rounded-none border-0 border-b border-border bg-transparent px-0',
};

const FOCUS_RING_CLASS = 'focus-within:ring-primary';
const INVALID_FOCUS_RING_CLASS = 'focus-within:ring-error';
const INVALID_BORDER_CLASS = 'border-error';

const joinClassNames = (...classes: Array<string | undefined | false>): string =>
  classes.filter(Boolean).join(' ');

const normalizeSize = (size: SelectProps['size']): SelectSize => {
  if (size === 'small') return 'small';
  if (size === 'large') return 'large';
  return 'medium';
};

const variantValue = (variant: SelectProps['variant']): SelectVariant => {
  if (variant === 'filled' || variant === 'outlined' || variant === 'standard') {
    return variant;
  }
  return 'outlined';
};

const sizeClasses = (size: SelectProps['size'], map: Record<SelectSize, string>): string =>
  map[normalizeSize(size)];

const controlSizeClasses = (size: SelectProps['size'], variant: SelectVariant): string => {
  if (variant === 'standard') {
    return joinClassNames('px-0 py-xs', sizeClasses(size, TEXT_SIZE_CLASS_MAP));
  }

  return joinClassNames(
    sizeClasses(size, CONTROL_SIZE_CLASS_MAP),
    sizeClasses(size, TEXT_SIZE_CLASS_MAP),
  );
};

const variantClasses = (variant: SelectVariant): string => VARIANT_CLASS_MAP[variant];

const stateClasses = (invalid?: boolean): string =>
  joinClassNames(
    invalid ? INVALID_FOCUS_RING_CLASS : FOCUS_RING_CLASS,
    invalid && INVALID_BORDER_CLASS,
  );

export const getRootClassName = ({ className }: { className?: string }): string =>
  joinClassNames(ROOT_CLASS, className);

export const getControlClassName = ({
  size,
  variant,
  invalid,
  disabled,
}: Pick<SelectProps, 'size' | 'variant' | 'invalid' | 'disabled'>): string => {
  const resolvedVariant = variantValue(variant);

  return joinClassNames(
    CONTROL_BASE_CLASS,
    controlSizeClasses(size, resolvedVariant),
    variantClasses(resolvedVariant),
    stateClasses(invalid),
    disabled && 'cursor-not-allowed opacity-50',
  );
};

export const getSelectClassName = (): string => SELECT_BASE_CLASS;

export const getAdornmentClassName = ({ size }: Pick<SelectProps, 'size'>): string =>
  joinClassNames(ADORNMENT_CLASS, sizeClasses(size, TEXT_SIZE_CLASS_MAP));
