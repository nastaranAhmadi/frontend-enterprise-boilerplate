import type { ReactNode } from 'react';
import { forwardRef } from 'react';

import type { ButtonProps } from './Button.types';

type TokenColor = 'primary' | 'muted' | 'border';
type KnownSize = 'sm' | 'md' | 'lg';
type KnownVariant = 'filled' | 'outlined' | 'text' | 'ghost' | 'link';

const BASE_CLASS_NAME =
  'inline-flex items-center justify-center gap-xs rounded-md font-sans transition-colors duration-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50 disabled:cursor-not-allowed';

const SIZE_CLASS_MAP: Record<KnownSize, string> = {
  sm: 'px-sm py-xs text-sm',
  md: 'px-md py-sm text-md',
  lg: 'px-lg py-md text-lg',
};

const ICON_SIZE_CLASS_MAP: Record<KnownSize, string> = {
  sm: 'w-sm h-sm text-sm',
  md: 'w-md h-md text-md',
  lg: 'w-lg h-lg text-lg',
};

const COLOR_CLASS_MAP: Record<TokenColor, string> = {
  primary: 'text-primary',
  muted: 'text-muted',
  border: 'text-border',
};

const sizeClasses = (size: ButtonProps['size']): string => {
  if (!size) return SIZE_CLASS_MAP.md;
  if (size in SIZE_CLASS_MAP) return SIZE_CLASS_MAP[size as KnownSize];
  return String(size);
};

const iconSizeClasses = (iconSize: ButtonProps['iconSize']): string => {
  if (!iconSize) return ICON_SIZE_CLASS_MAP.md;
  if (iconSize in ICON_SIZE_CLASS_MAP) return ICON_SIZE_CLASS_MAP[iconSize as KnownSize];
  return String(iconSize);
};

const variantClasses = (variant: KnownVariant, color: TokenColor): string => {
  switch (variant) {
    case 'filled':
      return 'bg-primary text-background hover:bg-muted';
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

const joinClassNames = (...classes: Array<string | undefined | false>): string =>
  classes.filter(Boolean).join(' ');

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

const LoadingSlot = ({ loading }: { loading?: boolean }) => (
  <span aria-hidden="true" className="inline-flex w-sm h-sm shrink-0 items-center justify-center">
    {loading ? (
      <span className="w-sm h-sm animate-spin rounded-full border-2 border-primary border-t-transparent" />
    ) : null}
  </span>
);

const renderIcon = ({ icon, iconClassName }: { icon?: ReactNode; iconClassName: string }) => {
  if (!icon) return null;
  return <span className={iconClassName}>{icon}</span>;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(props, ref) {
  const {
    type,
    onClick,
    children,
    className,
    color,
    disabled,
    startIcon,
    endIcon,
    fullWidth,
    iconColor,
    iconSize,
    loading,
    size,
    variant,
    ...buttonProps
  } = props;

  const isDisabled = Boolean(disabled || loading);
  const iconColorClass = COLOR_CLASS_MAP[colorToken(iconColor)];

  const buttonClassName = joinClassNames(
    BASE_CLASS_NAME,
    sizeClasses(size),
    variantClasses(variantValue(variant), colorToken(color)),
    fullWidth && 'w-full',
    className,
  );

  const iconClassName = joinClassNames(iconSizeClasses(iconSize), iconColorClass);

  return (
    <button
      {...buttonProps}
      ref={ref}
      type={type ?? 'button'}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      className={buttonClassName}
      onClick={onClick}
    >
      <LoadingSlot loading={loading} />
      {renderIcon({ icon: startIcon, iconClassName })}
      {children}
      {renderIcon({ icon: endIcon, iconClassName })}
    </button>
  );
});
