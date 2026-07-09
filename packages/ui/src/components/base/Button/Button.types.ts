import type { ButtonHTMLAttributes, ReactNode } from 'react';

import type { Color, Size } from '../../../types';

export type ButtonVariant = 'filled' | 'outlined' | 'text' | 'ghost' | 'link';

export interface ButtonOwnProps {
  children?: ReactNode;
  className?: string;
  color?: Color;
  disabled?: boolean;
  fullWidth?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  iconColor?: Color;
  iconSize?: Size;
  loading?: boolean;
  size?: Size;
  variant?: ButtonVariant;
}

export type ButtonProps = ButtonOwnProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonOwnProps | 'color'>;
