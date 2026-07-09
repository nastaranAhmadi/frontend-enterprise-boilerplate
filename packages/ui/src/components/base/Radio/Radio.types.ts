import type { InputHTMLAttributes, ReactNode } from 'react';

import type { Size } from '../../../types';

export interface RadioOwnProps {
  label?: ReactNode;
  invalid?: boolean;
  size?: Size;
}

export type RadioProps = RadioOwnProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, keyof RadioOwnProps | 'type'>;
