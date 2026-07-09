import type { ChangeEventHandler, ReactNode } from 'react';

import type { Size } from '../../../types';

export interface RadioGroupOwnProps {
  label?: ReactNode;
  helperText?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  className?: string;
  name: string;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  size?: Size;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  children?: ReactNode;
}

export type RadioGroupProps = RadioGroupOwnProps;
