import type { ReactNode } from 'react';

import type { Size } from '../../../types';

export interface SharedFieldProps {
  label?: ReactNode;
  helperText?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  className?: string;
  id?: string;
  disabled?: boolean;
  size?: Size;
  'aria-describedby'?: string;
}
