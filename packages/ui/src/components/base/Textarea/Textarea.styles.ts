import type { TextareaProps, TextareaVariant } from './Textarea.types';

type TextareaSize = NonNullable<TextareaProps['size']>;

export const ROOT_CLASS = 'inline-flex w-full flex-col font-sans';

export const CONTROL_BASE_CLASS =
  'inline-flex w-full min-w-0 transition-colors duration-normal focus-within:ring-2';

export const TEXTAREA_BASE_CLASS =
  'w-full min-w-0 flex-1 bg-transparent text-inherit placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 resize-y';

const CONTROL_SIZE_CLASS_MAP: Record<TextareaSize, string> = {
  small: 'px-sm py-xs',
  medium: 'px-md py-sm',
  large: 'px-lg py-md',
};

const TEXT_SIZE_CLASS_MAP: Record<TextareaSize, string> = {
  small: 'text-sm',
  medium: 'text-md',
  large: 'text-lg',
};

const VARIANT_CLASS_MAP: Record<TextareaVariant, string> = {
  filled: 'rounded-md border border-transparent bg-muted',
  outlined: 'rounded-md border border-border bg-background',
  standard: 'rounded-none border-0 border-b border-border bg-transparent px-0',
};

const FOCUS_RING_CLASS = 'focus-within:ring-primary';
const INVALID_FOCUS_RING_CLASS = 'focus-within:ring-error';
const INVALID_BORDER_CLASS = 'border-error';

const joinClassNames = (...classes: Array<string | undefined | false>): string =>
  classes.filter(Boolean).join(' ');

const normalizeSize = (size: TextareaProps['size']): TextareaSize => {
  if (size === 'small') return 'small';
  if (size === 'large') return 'large';
  return 'medium';
};

const variantValue = (variant: TextareaProps['variant']): TextareaVariant => {
  if (variant === 'filled' || variant === 'outlined' || variant === 'standard') {
    return variant;
  }
  return 'outlined';
};

const sizeClasses = (size: TextareaProps['size'], map: Record<TextareaSize, string>): string =>
  map[normalizeSize(size)];

const controlSizeClasses = (size: TextareaProps['size'], variant: TextareaVariant): string => {
  if (variant === 'standard') {
    return joinClassNames('px-0 py-xs', sizeClasses(size, TEXT_SIZE_CLASS_MAP));
  }

  return joinClassNames(
    sizeClasses(size, CONTROL_SIZE_CLASS_MAP),
    sizeClasses(size, TEXT_SIZE_CLASS_MAP),
  );
};

const variantClasses = (variant: TextareaVariant): string => VARIANT_CLASS_MAP[variant];

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
}: Pick<TextareaProps, 'size' | 'variant' | 'invalid' | 'disabled'>): string => {
  const resolvedVariant = variantValue(variant);

  return joinClassNames(
    CONTROL_BASE_CLASS,
    controlSizeClasses(size, resolvedVariant),
    variantClasses(resolvedVariant),
    stateClasses(invalid),
    disabled && 'cursor-not-allowed opacity-50',
  );
};

export const getTextareaClassName = (): string => TEXTAREA_BASE_CLASS;
