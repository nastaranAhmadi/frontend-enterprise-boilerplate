import type { HTMLAttributes } from 'react';

import type { Size } from '../../../types';

export type OTPInputLength = 4 | 6;

export interface OTPInputOwnProps {
  'aria-label'?: string;
  autoFocus?: boolean;
  className?: string;
  defaultValue?: string;
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
