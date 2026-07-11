import { forwardRef } from 'react';

import { Checkbox } from '../../base/Checkbox';
import { FieldShell } from '../field/FieldShell';
import { getCheckboxFieldControlRowClassName } from './CheckboxField.styles';
import type { CheckboxFieldProps } from './CheckboxField.types';

export const CheckboxField = forwardRef<HTMLInputElement, CheckboxFieldProps>(
  function CheckboxField(props, ref) {
    const {
      label,
      helperText,
      error: errorMessage,
      required,
      className,
      checkboxRootClassName,
      id,
      disabled,
      size,
      'aria-describedby': ariaDescribedByProp,
      ...checkboxProps
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
        labelPlacement="inline-control-first"
        controlRowClassName={getCheckboxFieldControlRowClassName({})}
        control={(field) => (
          <Checkbox
            {...checkboxProps}
            ref={ref}
            id={field.id}
            disabled={disabled}
            size={size}
            invalid={field.hasError}
            aria-describedby={field.ariaDescribedBy}
            className={checkboxRootClassName}
          />
        )}
      />
    );
  },
);

CheckboxField.displayName = 'CheckboxField';
