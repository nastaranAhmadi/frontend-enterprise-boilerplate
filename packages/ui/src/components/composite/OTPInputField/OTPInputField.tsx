import { forwardRef } from 'react';

import { OTPInput } from '../../base/OTPInput';
import { FieldShell } from '../field/FieldShell';
import { getOTPInputFieldRootClassName, OTP_INPUT_FIELD_LABEL_CLASS } from './OTPInputField.styles';
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
        className={getOTPInputFieldRootClassName({ className })}
        labelClassName={OTP_INPUT_FIELD_LABEL_CLASS}
        labelDir="auto"
        helperDir="auto"
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
