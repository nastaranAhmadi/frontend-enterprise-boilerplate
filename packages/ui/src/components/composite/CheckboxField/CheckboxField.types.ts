import type { ReactNode } from 'react';

import type { CheckboxProps } from '../../base/Checkbox';

export interface CheckboxFieldOwnProps {
  label?: ReactNode;
  helperText?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  className?: string;
  /** Applied to the Checkbox root wrapper (`<div>`), not the native `<input>`. */
  checkboxRootClassName?: string;
}

export type CheckboxFieldProps = CheckboxFieldOwnProps &
  Omit<CheckboxProps, keyof CheckboxFieldOwnProps | 'invalid' | 'className'>;
