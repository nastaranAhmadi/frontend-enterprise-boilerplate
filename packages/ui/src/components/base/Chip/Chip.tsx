import {
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  forwardRef,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type Ref,
} from 'react';

import {
  getChipAvatarClassName,
  getChipClassName,
  getChipDeleteButtonClassName,
  getChipIconClassName,
  getChipLabelClassName,
  isChipInteractive,
} from './Chip.styles';
import type { ChipOwnProps, ChipProps } from './Chip.types';

const DefaultDeleteIcon = () => <span aria-hidden="true">×</span>;

export const Chip = forwardRef<HTMLElement, ChipProps>(function Chip(props, ref) {
  const {
    avatar,
    children,
    className,
    clickable = false,
    color = 'neutral',
    deleteAriaLabel = 'Remove',
    deleteIcon,
    disabled = false,
    href,
    icon,
    onClick,
    onDelete,
    onKeyDown,
    rel,
    size = 'medium',
    target,
    variant = 'filled',
    ...chipProps
  } = props;

  const interactive = isChipInteractive({ onClick, onDelete, href, clickable });
  const hasDelete = Boolean(onDelete);
  const hasClickHandler = Boolean(onClick || href);
  const adornment = avatar ?? icon;
  const label = children;

  const chipClassName = getChipClassName({
    color,
    variant,
    size,
    interactive,
    className,
  });

  const handleDelete = (event: ReactMouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (!disabled) {
      onDelete?.(event);
    }
  };

  const handleChipKeyDown = (event: ReactKeyboardEvent<HTMLElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented || disabled) return;

    if (hasDelete && (event.key === 'Backspace' || event.key === 'Delete')) {
      event.preventDefault();
      onDelete?.(event as unknown as ReactMouseEvent<HTMLButtonElement>);
      return;
    }

    if (event.key === 'Escape') {
      event.currentTarget.blur();
    }
  };

  const content = (
    <>
      {adornment ? (
        <span
          className={avatar ? getChipAvatarClassName({ size }) : getChipIconClassName({ size })}
        >
          {adornment}
        </span>
      ) : null}
      {label ? <span className={getChipLabelClassName()}>{label}</span> : null}
      {hasDelete ? (
        <button
          type="button"
          aria-label={deleteAriaLabel}
          disabled={disabled}
          className={getChipDeleteButtonClassName({ size })}
          onClick={handleDelete}
        >
          {deleteIcon ?? <DefaultDeleteIcon />}
        </button>
      ) : null}
    </>
  );

  if (href) {
    const anchorProps = chipProps as Omit<ChipProps, keyof ChipOwnProps> &
      Pick<AnchorHTMLAttributes<HTMLAnchorElement>, 'id'>;

    return (
      <a
        {...anchorProps}
        ref={ref as Ref<HTMLAnchorElement>}
        href={disabled ? undefined : href}
        rel={rel}
        target={target}
        aria-disabled={disabled || undefined}
        className={chipClassName}
        onClick={disabled ? undefined : onClick}
        onKeyDown={handleChipKeyDown}
      >
        {content}
      </a>
    );
  }

  if (hasClickHandler && !hasDelete) {
    const buttonProps = chipProps as Omit<ChipProps, keyof ChipOwnProps> &
      ButtonHTMLAttributes<HTMLButtonElement>;

    return (
      <button
        {...buttonProps}
        ref={ref as Ref<HTMLButtonElement>}
        type="button"
        disabled={disabled}
        className={chipClassName}
        onClick={onClick}
        onKeyDown={handleChipKeyDown}
      >
        {content}
      </button>
    );
  }

  if (interactive) {
    return (
      <span
        {...chipProps}
        ref={ref}
        role={hasClickHandler ? 'button' : undefined}
        tabIndex={disabled ? undefined : 0}
        aria-disabled={disabled || undefined}
        className={chipClassName}
        onClick={disabled ? undefined : onClick}
        onKeyDown={handleChipKeyDown}
      >
        {content}
      </span>
    );
  }

  return (
    <span {...chipProps} ref={ref} className={chipClassName}>
      {content}
    </span>
  );
});

Chip.displayName = 'Chip';
