import { forwardRef } from 'react';

import { OTPInput } from '../../base/OTPInput';
import { FieldShell } from '../field/FieldShell';
import type { OTPInputFieldProps } from './OTPInputField.types';

export const OTPInputField = forwardRef<HTMLDivElement, OTPInputFieldProps>(
  function OTPInputField(props, ref) {
    const {
      label,
      helperText,
      error: errorMessage,
      required,
      className,
      otpInputRootClassName,
      id,
      disabled,
      size,
      'aria-describedby': ariaDescribedByProp,
      ...otpInputProps
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
          <OTPInput
            {...otpInputProps}
            ref={ref}
            id={field.id}
            aria-describedby={field.ariaDescribedBy}
            disabled={disabled}
            invalid={field.hasError}
            size={size}
            className={otpInputRootClassName}
          />
        )}
      />
    );
  },
);

OTPInputField.displayName = 'OTPInputField';
