import { forwardRef } from 'react';

import { Input } from '../../base/Input';
import { FieldShell } from '../field/FieldShell';
import type { FormFieldProps } from './FormField.types';

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  function FormField(props, ref) {
    const {
      label,
      helperText,
      error: errorMessage,
      required,
      className,
      inputRootClassName,
      id,
      disabled,
      size,
      'aria-describedby': ariaDescribedByProp,
      ...inputProps
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
          <Input
            {...inputProps}
            ref={ref}
            id={field.id}
            disabled={disabled}
            size={size}
            invalid={field.hasError}
            aria-describedby={field.ariaDescribedBy}
            className={inputRootClassName}
          />
        )}
      />
    );
  },
);

FormField.displayName = 'FormField';
