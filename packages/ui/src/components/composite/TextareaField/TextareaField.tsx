import { forwardRef } from 'react';

import { Textarea } from '../../base/Textarea';
import { FieldShell } from '../field/FieldShell';
import type { TextareaFieldProps } from './TextareaField.types';

export const TextareaField = forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
  function TextareaField(props, ref) {
    const {
      label,
      helperText,
      error: errorMessage,
      required,
      className,
      textareaRootClassName,
      id,
      disabled,
      size,
      'aria-describedby': ariaDescribedByProp,
      ...textareaProps
    } = props;

    return (
      <FieldShell
        id={id}
        label={label}
        helperText={helperText}
        error={errorMessage}
        required={required}
        className={className}
        disabled={disabled}
        size={size}
        aria-describedby={ariaDescribedByProp}
        control={(field) => (
          <Textarea
            {...textareaProps}
            ref={ref}
            id={field.id}
            disabled={disabled}
            size={size}
            invalid={field.hasError}
            aria-describedby={field.ariaDescribedBy}
            className={textareaRootClassName}
          />
        )}
      />
    );
  },
);

TextareaField.displayName = 'TextareaField';
