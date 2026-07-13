import type { FloatingButtonProps } from './FloatingButton.types';

type FloatingButtonSize = NonNullable<FloatingButtonProps['size']>;
type FloatingButtonVariant = NonNullable<FloatingButtonProps['variant']>;
type FloatingButtonColor = NonNullable<FloatingButtonProps['color']>;

export const FLOATING_BUTTON_BASE_CLASS =
  'inline-flex shrink-0 items-center justify-center rounded-full font-sans shadow-md transition-[box-shadow,background-color,transform] duration-normal ease-out hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none';

export const FLOATING_BUTTON_LABEL_CLASS = 'font-medium leading-none';
export const FLOATING_BUTTON_ICON_CLASS = 'inline-flex shrink-0 items-center justify-center';
export const LOADING_SPINNER_CLASS =
  'animate-spin rounded-full border-2 border-current border-t-transparent';

const CIRCULAR_SIZE_CLASS_MAP: Record<FloatingButtonSize, string> = {
  small: 'h-10 w-10',
  medium: 'h-12 w-12',
  large: 'h-14 w-14',
};

const EXTENDED_SIZE_CLASS_MAP: Record<FloatingButtonSize, string> = {
  small: 'h-8 gap-xs px-md text-sm',
  medium: 'h-10 gap-xs px-lg text-md',
  large: 'h-12 gap-sm px-xl text-md',
};

const ICON_SIZE_CLASS_MAP: Record<FloatingButtonSize, string> = {
  small: 'h-4 w-4 text-sm',
  medium: 'h-5 w-5 text-md',
  large: 'h-6 w-6 text-lg',
};

const LOADING_SIZE_CLASS_MAP: Record<FloatingButtonSize, string> = {
  small: 'h-4 w-4',
  medium: 'h-5 w-5',
  large: 'h-6 w-6',
};

const COLOR_CLASS_MAP: Record<FloatingButtonColor, string> = {
  primary: 'bg-primary text-background hover:bg-primary/90',
  secondary: 'bg-secondary text-background hover:bg-secondary/90',
};

const joinClassNames = (...classes: Array<string | undefined | false>): string =>
  classes.filter(Boolean).join(' ');

const normalizeSize = (size: FloatingButtonProps['size']): FloatingButtonSize => {
  if (size === 'small') return 'small';
  if (size === 'medium') return 'medium';
  return 'large';
};

const normalizeVariant = (variant: FloatingButtonProps['variant']): FloatingButtonVariant =>
  variant === 'extended' ? 'extended' : 'circular';

const normalizeColor = (color: FloatingButtonProps['color']): FloatingButtonColor =>
  color === 'secondary' ? 'secondary' : 'primary';

export const getFloatingButtonClassName = ({
  size,
  variant,
  color,
  className,
}: Pick<FloatingButtonProps, 'size' | 'variant' | 'color'> & { className?: string }): string => {
  const resolvedSize = normalizeSize(size);
  const resolvedVariant = normalizeVariant(variant);

  return joinClassNames(
    FLOATING_BUTTON_BASE_CLASS,
    COLOR_CLASS_MAP[normalizeColor(color)],
    resolvedVariant === 'circular'
      ? CIRCULAR_SIZE_CLASS_MAP[resolvedSize]
      : EXTENDED_SIZE_CLASS_MAP[resolvedSize],
    className,
  );
};

export const getFloatingButtonIconClassName = ({
  size,
}: Pick<FloatingButtonProps, 'size'>): string =>
  joinClassNames(FLOATING_BUTTON_ICON_CLASS, ICON_SIZE_CLASS_MAP[normalizeSize(size)]);

export const getFloatingButtonSpinnerClassName = ({
  size,
}: Pick<FloatingButtonProps, 'size'>): string =>
  joinClassNames(LOADING_SPINNER_CLASS, LOADING_SIZE_CLASS_MAP[normalizeSize(size)]);
