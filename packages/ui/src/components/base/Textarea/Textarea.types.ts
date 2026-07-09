import type { TextareaHTMLAttributes } from 'react';

import type { Size } from '../../../types';

export type TextareaVariant = 'filled' | 'outlined' | 'standard';

export interface TextareaOwnProps {
  invalid?: boolean;
  size?: Size;
  variant?: TextareaVariant;
}

export type TextareaProps = TextareaOwnProps &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, keyof TextareaOwnProps>;
