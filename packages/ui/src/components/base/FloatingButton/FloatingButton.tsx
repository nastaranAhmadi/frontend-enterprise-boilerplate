import { forwardRef } from 'react';

import {
  FLOATING_BUTTON_LABEL_CLASS,
  getFloatingButtonClassName,
  getFloatingButtonIconClassName,
  getFloatingButtonSpinnerClassName,
} from './FloatingButton.styles';
import type { FloatingButtonProps } from './FloatingButton.types';

const renderIcon = (icon: FloatingButtonProps['icon'], iconClassName: string) => {
  if (!icon) return null;
  return <span className={iconClassName}>{icon}</span>;
};

export const FloatingButton = forwardRef<HTMLButtonElement, FloatingButtonProps>(
  function FloatingButton(props, ref) {
    const {
      children,
      className,
      color = 'primary',
      disabled,
      icon,
      loading = false,
      size = 'large',
      type,
      variant = 'circular',
      onClick,
      ...floatingButtonProps
    } = props;

    const isDisabled = disabled || loading;
    const isExtended = variant === 'extended';
    const iconClassName = getFloatingButtonIconClassName({ size });
    const iconContent = isExtended ? icon : (icon ?? children);
    const label = isExtended ? children : undefined;

    return (
      <button
        {...floatingButtonProps}
        ref={ref}
        type={type ?? 'button'}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        className={getFloatingButtonClassName({ size, variant, color, className })}
        onClick={onClick}
      >
        {loading ? (
          <span aria-hidden="true" className={getFloatingButtonSpinnerClassName({ size })} />
        ) : (
          <>
            {renderIcon(iconContent, iconClassName)}
            {label ? <span className={FLOATING_BUTTON_LABEL_CLASS}>{label}</span> : null}
          </>
        )}
      </button>
    );
  },
);

FloatingButton.displayName = 'FloatingButton';
