import { forwardRef, useId } from 'react';

import { ErrorMessage } from '../../base/ErrorMessage';
import { HelperText } from '../../base/HelperText';
import { Input } from '../../base/Input';
import { Label } from '../../base/Label';
import { getFormFieldClassName } from './FormField.styles';
import type { FormFieldProps } from './FormField.types';

const buildAriaDescribedBy = (...ids: Array<string | undefined>): string | undefined => {
  const value = ids.filter(Boolean).join(' ');
  return value || undefined;
};

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  function FormField(props, ref) {
    const {
      label,
      helperText,
      error: errorMessage,
      required,
      className,
      inputRootClassName,
      id: idProp,
      disabled,
      size,
      'aria-describedby': ariaDescribedByProp,
      ...inputProps
    } = props;

    const generatedId = useId();
    const id = idProp ?? generatedId;
    const helperId = `${id}-helper`;
    const errorId = `${id}-error`;

    const hasHelperText = Boolean(helperText);
    const hasError = Boolean(errorMessage);

    const ariaDescribedBy = buildAriaDescribedBy(
      hasHelperText ? helperId : undefined,
      hasError ? errorId : undefined,
      ariaDescribedByProp,
    );

    return (
      <div className={getFormFieldClassName({ className })}>
        {label ? (
          <Label htmlFor={id} required={required} disabled={disabled} size={size}>
            {label}
          </Label>
        ) : null}

        <Input
          {...inputProps}
          ref={ref}
          id={id}
          disabled={disabled}
          size={size}
          invalid={hasError}
          aria-describedby={ariaDescribedBy}
          className={inputRootClassName}
        />

        {hasHelperText ? (
          <HelperText id={helperId} disabled={disabled} size={size}>
            {helperText}
          </HelperText>
        ) : null}

        {hasError ? (
          <ErrorMessage id={errorId} size={size}>
            {errorMessage}
          </ErrorMessage>
        ) : null}
      </div>
    );
  },
);

FormField.displayName = 'FormField';
