import type { DatePickerProps } from '../../base/DatePicker';

export interface DatePickerFieldOwnProps {
  'aria-describedby'?: string;
  className?: string;
  datePickerRootClassName?: string;
  error?: string;
  helperText?: string;
  id?: string;
  label?: string;
  required?: boolean;
}

export type DatePickerFieldProps = DatePickerFieldOwnProps &
  Omit<DatePickerProps, keyof DatePickerFieldOwnProps | 'invalid' | 'className'>;
