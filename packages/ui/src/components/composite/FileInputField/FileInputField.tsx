import { forwardRef } from 'react';

import { FileInput } from '../../base/FileInput';
import { FieldShell } from '../field/FieldShell';
import type { FileInputFieldProps } from './FileInputField.types';

export const FileInputField = forwardRef<HTMLInputElement, FileInputFieldProps>(
  function FileInputField(props, ref) {
    const {
      label,
      helperText,
      error: errorMessage,
      required,
      className,
      fileInputRootClassName,
      id,
      disabled,
      size,
      'aria-describedby': ariaDescribedByProp,
      ...fileInputProps
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
          <FileInput
            {...fileInputProps}
            ref={ref}
            id={field.id}
            disabled={disabled}
            size={size}
            invalid={field.hasError}
            aria-describedby={field.ariaDescribedBy}
            className={fileInputRootClassName}
          />
        )}
      />
    );
  },
);

FileInputField.displayName = 'FileInputField';
