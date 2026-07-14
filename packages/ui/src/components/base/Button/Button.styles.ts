import type { Size } from '../../../types';
import type { ButtonProps } from './Button.types';

type TokenColor = 'primary' | 'muted' | 'border';
type KnownVariant = 'filled' | 'outlined' | 'text' | 'ghost' | 'link';

export const BASE_CLASS_NAME =
  'inline-flex items-center justify-center gap-xs rounded-md font-sans transition-colors duration-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50 disabled:cursor-not-allowed';

export const LOADING_SLOT_CLASS = 'inline-flex w-sm h-sm shrink-0 items-center justify-center';

export const LOADING_SPINNER_CLASS =
  'w-sm h-sm animate-spin rounded-full border-2 border-primary border-t-transparent';

const SIZE_CLASS_MAP: Record<Size, string> = {
  small: 'px-sm py-xs text-sm',
  medium: 'px-md py-sm text-md',
  large: 'px-lg py-md text-lg',
};

const ICON_SIZE_CLASS_MAP: Record<Size, string> = {
  small: 'w-sm h-sm text-sm',
  medium: 'w-md h-md text-md',
  large: 'w-lg h-lg text-lg',
};

const COLOR_CLASS_MAP: Record<TokenColor, string> = {
  primary: 'text-primary',
  muted: 'text-muted-foreground',
  border: 'text-border',
};

const joinClassNames = (...classes: Array<string | undefined | false>): string =>
  classes.filter(Boolean).join(' ');

const sizeClasses = (size: ButtonProps['size']): string => {
  if (!size) return SIZE_CLASS_MAP.medium;
  return SIZE_CLASS_MAP[size];
};

const iconSizeClasses = (iconSize: ButtonProps['iconSize']): string => {
  if (!iconSize) return ICON_SIZE_CLASS_MAP.medium;
  return ICON_SIZE_CLASS_MAP[iconSize];
};

const colorToken = (color: ButtonProps['color']): TokenColor => {
  if (color === 'neutral') return 'muted';
  return 'primary';
};

const variantValue = (variant: ButtonProps['variant']): KnownVariant => {
  if (
    variant === 'filled' ||
    variant === 'outlined' ||
    variant === 'text' ||
    variant === 'ghost' ||
    variant === 'link'
  ) {
    return variant;
  }
  return 'text';
};

const variantClasses = (variant: KnownVariant, color: TokenColor): string => {
  switch (variant) {
    case 'filled':
      return 'bg-primary text-primary-foreground hover:opacity-90';
    case 'outlined':
      return 'bg-background border border-border text-foreground hover:bg-muted';
    case 'ghost':
      return 'bg-transparent border border-transparent text-foreground hover:bg-muted';
    case 'link':
      return `bg-transparent ${COLOR_CLASS_MAP[color]} underline underline-offset-2 hover:no-underline`;
    case 'text':
    default:
      return `bg-transparent ${COLOR_CLASS_MAP[color]} hover:bg-muted`;
  }
};

export const getButtonClassName = ({
  size,
  variant,
  color,
  fullWidth,
  className,
}: Pick<ButtonProps, 'size' | 'variant' | 'color' | 'fullWidth'> & {
  className?: string;
}): string =>
  joinClassNames(
    BASE_CLASS_NAME,
    sizeClasses(size),
    variantClasses(variantValue(variant), colorToken(color)),
    fullWidth && 'w-full',
    className,
  );

export const getIconClassName = ({
  iconSize,
  iconColor,
}: Pick<ButtonProps, 'iconSize' | 'iconColor'>): string =>
  joinClassNames(iconSizeClasses(iconSize), COLOR_CLASS_MAP[colorToken(iconColor)]);
