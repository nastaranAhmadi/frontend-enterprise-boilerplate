import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';

import type { Size } from '../../../types';
import type { FloatingButtonColor } from '../../base/FloatingButton/FloatingButton.types';

export type SpeedDialDirection = 'up' | 'down' | 'left' | 'right';

export interface SpeedDialOwnProps {
  /**
   * Only direct `SpeedDial.Action` children are collected. Wrappers, fragments, and
   * re-exported components are not supported in v1.
   */
  children?: ReactNode;
  className?: string;
  direction?: SpeedDialDirection;
  disabled?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  'aria-label': string;
  icon?: ReactNode;
  openIcon?: ReactNode;
  color?: FloatingButtonColor;
  size?: Size;
  /**
   * Shows persistent action labels via lightweight `role="tooltip"` spans.
   * For hover/focus tooltips, compose `@enterprise/ui` `Tooltip` instead.
   */
  tooltipOpen?: boolean;
}

export type SpeedDialProps = SpeedDialOwnProps &
  Omit<HTMLAttributes<HTMLDivElement>, keyof SpeedDialOwnProps>;

export interface SpeedDialActionOwnProps {
  icon: ReactNode;
  tooltip: string;
  className?: string;
  disabled?: boolean;
}

export type SpeedDialActionProps = SpeedDialActionOwnProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof SpeedDialActionOwnProps>;
