import type { ReactNode } from 'react';

import type { SelectProps } from '../../base/Select';

export interface SelectFieldOwnProps {
  label?: ReactNode;
  helperText?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  className?: string;
  /** Applied to the Select root wrapper (`<div>`), not the native `<select>`. */
  selectRootClassName?: string;
}

export type SelectFieldProps = SelectFieldOwnProps &
  Omit<SelectProps, keyof SelectFieldOwnProps | 'invalid' | 'className'>;
