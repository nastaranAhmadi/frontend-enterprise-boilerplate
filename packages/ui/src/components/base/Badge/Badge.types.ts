import type { HTMLAttributes, ReactNode } from 'react';

/** Semantic colors supported by `Badge` styling. */
export type BadgeColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'neutral';

export type BadgeVariant = 'standard' | 'dot';

export type BadgeOverlap = 'rectangular' | 'circular';

export type BadgeAnchorVertical = 'top' | 'bottom';

export type BadgeAnchorHorizontal = 'left' | 'right';

export interface BadgeAnchorOrigin {
  vertical?: BadgeAnchorVertical;
  horizontal?: BadgeAnchorHorizontal;
}

export interface BadgeOwnProps {
  anchorOrigin?: BadgeAnchorOrigin;
  /**
   * Accessible name for the wrapped element when the badge supplements an icon-only
   * trigger, for example `"4 unread messages"`. Falls back to the numeric badge
   * content when the child has no existing accessible name.
   */
  badgeAriaLabel?: string;
  badgeClassName?: string;
  badgeContent?: ReactNode;
  children: ReactNode;
  className?: string;
  color?: BadgeColor;
  invisible?: boolean;
  max?: number;
  overlap?: BadgeOverlap;
  showZero?: boolean;
  variant?: BadgeVariant;
}

export type BadgeProps = BadgeOwnProps &
  Omit<HTMLAttributes<HTMLSpanElement>, keyof BadgeOwnProps | 'color'>;
