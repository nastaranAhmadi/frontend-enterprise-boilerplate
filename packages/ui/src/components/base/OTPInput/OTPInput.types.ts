import type { HTMLAttributes } from 'react';

import type { Size } from '../../../types';

export type OTPInputLength = 4 | 6;

export interface OTPInputOwnProps {
  'aria-label'?: string;
  autoFocus?: boolean;
  className?: string;
  defaultValue?: string;
  /**
   * Layout direction. OTP digits are inherently left-to-right regardless of
   * page locale, so the component defaults to `ltr`. Pass `'rtl'` only when
   * the surrounding page direction should inform keyboard navigation.
   */
  dir?: 'ltr' | 'rtl';
  disabled?: boolean;
  id?: string;
  invalid?: boolean;
  length?: OTPInputLength;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  separator?: boolean;
  size?: Size;
  value?: string;
}

export type OTPInputProps = OTPInputOwnProps &
  Omit<HTMLAttributes<HTMLDivElement>, keyof OTPInputOwnProps>;
