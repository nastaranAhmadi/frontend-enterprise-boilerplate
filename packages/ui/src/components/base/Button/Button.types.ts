import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'filled' | 'outlined' | 'text' | 'ghost' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg' | (string & {});
type ButtonColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'neutral'
  | (string & {});
type ButtonIconSize = 'sm' | 'md' | 'lg' | (string & {});
type ButtonIconColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'neutral'
  | (string & {});

type ButtonOwnProps = {
  children?: ReactNode;
  className?: string;
  color?: ButtonColor;
  disabled?: boolean;
  fullWidth?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  iconColor?: ButtonIconColor;
  iconSize?: ButtonIconSize;
  loading?: boolean;
  size?: ButtonSize;
  variant?: ButtonVariant;
};
export type ButtonProps = ButtonOwnProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonOwnProps | 'color'>;
