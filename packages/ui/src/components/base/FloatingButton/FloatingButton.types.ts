import type { ButtonHTMLAttributes, ReactNode } from 'react';

import type { Size } from '../../../types';

export type FloatingButtonVariant = 'circular' | 'extended';
export type FloatingButtonColor = 'primary' | 'secondary';

export interface FloatingButtonOwnProps {
  children?: ReactNode;
  className?: string;
  color?: FloatingButtonColor;
  disabled?: boolean;
  icon?: ReactNode;
  loading?: boolean;
  size?: Size;
  variant?: FloatingButtonVariant;
}

export type FloatingButtonProps = FloatingButtonOwnProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof FloatingButtonOwnProps | 'color'>;
