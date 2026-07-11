import { forwardRef } from 'react';

import { Select } from '../../base/Select';
import { FieldShell } from '../field/FieldShell';
import type { SelectFieldProps } from './SelectField.types';

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  function SelectField(props, ref) {
    const {
      label,
      helperText,
      error: errorMessage,
      required,
      className,
      selectRootClassName,
      children,
      id,
      disabled,
      size,
      'aria-describedby': ariaDescribedByProp,
      ...selectProps
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
          <Select
            {...selectProps}
            ref={ref}
            id={field.id}
            disabled={disabled}
            size={size}
            invalid={field.hasError}
            aria-describedby={field.ariaDescribedBy}
            className={selectRootClassName}
          >
            {children}
          </Select>
        )}
      />
    );
  },
);

SelectField.displayName = 'SelectField';
