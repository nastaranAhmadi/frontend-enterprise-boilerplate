import type { HTMLAttributes, ReactNode } from 'react';

export type AlertVariant = 'success' | 'error' | 'warning' | 'info' | 'neutral';

export interface AlertOwnProps {
  children?: ReactNode;
  className?: string;
  /** Accessible label for the dismiss control. Defaults to `"Dismiss"`. */
  closeLabel?: string;
  /**
   * Optional leading icon. Pass `false` to hide the default status icon.
   * Omit to show the variant's default icon.
   */
  icon?: ReactNode | false;
  onClose?: () => void;
  title?: ReactNode;
  variant?: AlertVariant;
}

export type AlertProps = AlertOwnProps &
  Omit<HTMLAttributes<HTMLDivElement>, keyof AlertOwnProps | 'title'>;
