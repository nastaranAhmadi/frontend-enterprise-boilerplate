import { forwardRef } from 'react';

import {
  getButtonClassName,
  getIconClassName,
  LOADING_SLOT_CLASS,
  LOADING_SPINNER_CLASS,
} from './Button.styles';
import type { ButtonProps } from './Button.types';

const LoadingSlot = ({ loading }: { loading?: boolean }) => (
  <span aria-hidden="true" className={LOADING_SLOT_CLASS}>
    {loading ? <span className={LOADING_SPINNER_CLASS} /> : null}
  </span>
);

const renderIcon = (icon: ButtonProps['startIcon'], iconClassName: string) => {
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
  const iconClassName = getIconClassName({ iconSize, iconColor });

  return (
    <button
      ref={ref}
      type={type ?? 'button'}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      className={getButtonClassName({ size, variant, color, fullWidth, className })}
      onClick={onClick}
      {...buttonProps}
    >
      <LoadingSlot loading={loading} />
      {renderIcon(startIcon, iconClassName)}
      {children}
      {renderIcon(endIcon, iconClassName)}
    </button>
  );
});

Button.displayName = 'Button';
