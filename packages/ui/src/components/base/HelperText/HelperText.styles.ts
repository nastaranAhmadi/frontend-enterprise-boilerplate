import type { HelperTextProps } from './HelperText.types';

type HelperTextSize = NonNullable<HelperTextProps['size']>;

export const HELPER_TEXT_BASE_CLASS = 'font-sans text-muted-foreground';

const TEXT_SIZE_CLASS_MAP: Record<HelperTextSize, string> = {
  small: 'text-sm',
  medium: 'text-md',
  large: 'text-lg',
};

const joinClassNames = (...classes: Array<string | undefined | false>): string =>
  classes.filter(Boolean).join(' ');

const normalizeSize = (size: HelperTextProps['size']): HelperTextSize => {
  if (size === 'small') return 'small';
  if (size === 'large') return 'large';
  return 'medium';
};

const sizeClasses = (size: HelperTextProps['size']): string =>
  TEXT_SIZE_CLASS_MAP[normalizeSize(size)];

export const getHelperTextClassName = ({
  size,
  disabled,
  className,
}: Pick<HelperTextProps, 'size' | 'disabled'> & { className?: string }): string =>
  joinClassNames(HELPER_TEXT_BASE_CLASS, sizeClasses(size), disabled && 'opacity-50', className);
