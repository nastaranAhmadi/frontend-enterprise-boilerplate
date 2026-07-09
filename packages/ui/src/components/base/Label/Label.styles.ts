import type { LabelProps } from './Label.types';

type LabelSize = NonNullable<LabelProps['size']>;

export const LABEL_BASE_CLASS =
  'inline-flex items-center gap-xs font-sans font-medium text-foreground';

export const REQUIRED_INDICATOR = '*';

export const REQUIRED_INDICATOR_CLASS = 'text-error';

const TEXT_SIZE_CLASS_MAP: Record<LabelSize, string> = {
  small: 'text-sm',
  medium: 'text-md',
  large: 'text-lg',
};

const joinClassNames = (...classes: Array<string | undefined | false>): string =>
  classes.filter(Boolean).join(' ');

const normalizeSize = (size: LabelProps['size']): LabelSize => {
  if (size === 'small') return 'small';
  if (size === 'large') return 'large';
  return 'medium';
};

const sizeClasses = (size: LabelProps['size']): string => TEXT_SIZE_CLASS_MAP[normalizeSize(size)];

export const getLabelClassName = ({
  size,
  disabled,
  className,
}: Pick<LabelProps, 'size' | 'disabled'> & { className?: string }): string =>
  joinClassNames(
    LABEL_BASE_CLASS,
    sizeClasses(size),
    disabled && 'cursor-not-allowed opacity-50',
    className,
  );
