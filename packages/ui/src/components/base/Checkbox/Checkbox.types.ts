import type { InputHTMLAttributes } from 'react';

import type { Size } from '../../../types';

export interface CheckboxOwnProps {
  invalid?: boolean;
  size?: Size;
}

export type CheckboxProps = CheckboxOwnProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, keyof CheckboxOwnProps>;
