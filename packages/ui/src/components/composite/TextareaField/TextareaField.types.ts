import type { ReactNode } from 'react';

import type { TextareaProps } from '../../base/Textarea';

export interface TextareaFieldOwnProps {
  label?: ReactNode;
  helperText?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  className?: string;
  /** Applied to the Textarea root wrapper (`<div>`), not the native `<textarea>`. */
  textareaRootClassName?: string;
}

export type TextareaFieldProps = TextareaFieldOwnProps &
  Omit<TextareaProps, keyof TextareaFieldOwnProps | 'invalid' | 'className'>;
