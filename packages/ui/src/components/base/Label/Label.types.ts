import type { LabelHTMLAttributes } from 'react';

import type { Size } from '../../../types';

export interface LabelOwnProps {
  disabled?: boolean;
  required?: boolean;
  size?: Size;
}

export type LabelProps = LabelOwnProps &
  Omit<LabelHTMLAttributes<HTMLLabelElement>, keyof LabelOwnProps>;
