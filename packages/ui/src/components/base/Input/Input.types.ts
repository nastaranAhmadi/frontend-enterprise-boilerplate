import type { InputHTMLAttributes, ReactNode } from 'react';

import type { Size } from '../../../types';

export type InputVariant = 'filled' | 'outlined' | 'standard';

export interface InputOwnProps {
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  invalid?: boolean;
  size?: Size;
  variant?: InputVariant;
}

export type InputProps = InputOwnProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, keyof InputOwnProps>;
