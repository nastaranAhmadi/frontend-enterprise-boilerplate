import { forwardRef } from 'react';

import { DatePicker } from '../../base/DatePicker';
import { FieldShell } from '../field/FieldShell';
import type { DatePickerFieldProps } from './DatePickerField.types';

export const DatePickerField = forwardRef<HTMLInputElement, DatePickerFieldProps>(
  function DatePickerField(props, ref) {
    const {
      label,
      helperText,
      error: errorMessage,
      required,
      className,
      datePickerRootClassName,
      id,
      disabled,
      size,
      'aria-describedby': ariaDescribedByProp,
      ...datePickerProps
    } = props;

    return (
      <FieldShell
        id={id}
        label={label}
        helperText={helperText}
        error={errorMessage}
        required={required}
        className={className}
        disabled={disabled}
        size={size}
        aria-describedby={ariaDescribedByProp}
        control={(field) => (
          <DatePicker
            {...datePickerProps}
            ref={ref}
            id={field.id}
            disabled={disabled}
            size={size}
            invalid={field.hasError}
            aria-describedby={field.ariaDescribedBy}
            className={datePickerRootClassName}
          />
        )}
      />
    );
  },
);

DatePickerField.displayName = 'DatePickerField';
