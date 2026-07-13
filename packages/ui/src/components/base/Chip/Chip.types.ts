import type {
  HTMLAttributes,
  MouseEvent,
  ReactNode,
} from 'react';

/** Semantic colors supported by `Chip` styling. */
export type ChipColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'neutral';

export type ChipVariant = 'filled' | 'outlined';

export type ChipSize = 'small' | 'medium';

export interface ChipOwnProps {
  avatar?: ReactNode;
  children?: ReactNode;
  className?: string;
  clickable?: boolean;
  color?: ChipColor;
  deleteAriaLabel?: string;
  deleteIcon?: ReactNode;
  disabled?: boolean;
  href?: string;
  icon?: ReactNode;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  /**
   * When provided with `onClick`, the root becomes a focusable composite widget
   * (`span[role="button"]`) with a nested delete button — not a single native
   * `<button>`. Prefer icon-only delete controls or separate actions when possible.
   */
  onDelete?: (event: MouseEvent<HTMLButtonElement>) => void;
  rel?: string;
  size?: ChipSize;
  target?: string;
  variant?: ChipVariant;
}

export type ChipProps = ChipOwnProps &
  Omit<HTMLAttributes<HTMLElement>, keyof ChipOwnProps | 'color' | 'onClick'>;
