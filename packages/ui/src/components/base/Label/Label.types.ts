import type { LabelHTMLAttributes, ReactNode } from 'react';

import type { Size } from '../../../types';

export interface LabelOwnProps {
  disabled?: boolean;
  required?: boolean;
  size?: Size;
}

export type LabelProps = LabelOwnProps &
  Omit<LabelHTMLAttributes<HTMLLabelElement>, keyof LabelOwnProps>;

export interface FieldLegendProps {
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
  id?: string;
  required?: boolean;
  size?: Size;
}
