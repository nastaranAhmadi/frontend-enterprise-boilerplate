import type { InputHTMLAttributes } from 'react';

import type { Size } from '../../../types';

export interface SwitchOwnProps {
  invalid?: boolean;
  size?: Size;
}

export type SwitchProps = SwitchOwnProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, keyof SwitchOwnProps>;
