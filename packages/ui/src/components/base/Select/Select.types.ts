import type { ReactNode, SelectHTMLAttributes } from 'react';

import type { Size } from '../../../types';

export type SelectVariant = 'filled' | 'outlined' | 'standard';

export interface SelectOwnProps {
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  invalid?: boolean;
  size?: Size;
  variant?: SelectVariant;
}

export type SelectProps = SelectOwnProps &
  Omit<SelectHTMLAttributes<HTMLSelectElement>, keyof SelectOwnProps>;
