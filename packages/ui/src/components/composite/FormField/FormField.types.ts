import type { ReactNode } from 'react';

import type { InputProps } from '../../base/Input';

export interface FormFieldOwnProps {
  label?: ReactNode;
  helperText?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  className?: string;
  /** Applied to the Input root wrapper (`<div>`), not the native `<input>`. */
  inputRootClassName?: string;
}

export type FormFieldProps = FormFieldOwnProps &
  Omit<InputProps, keyof FormFieldOwnProps | 'invalid' | 'className'>;
