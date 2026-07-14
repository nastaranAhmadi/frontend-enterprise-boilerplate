import type { OTPInputProps } from '../../base/OTPInput';

export interface OTPInputFieldOwnProps {
  'aria-describedby'?: string;
  className?: string;
  error?: string;
  helperText?: string;
  id?: string;
  label?: string;
  otpInputRootClassName?: string;
  required?: boolean;
}

export type OTPInputFieldProps = OTPInputFieldOwnProps &
  Omit<OTPInputProps, keyof OTPInputFieldOwnProps | 'invalid' | 'className'>;
