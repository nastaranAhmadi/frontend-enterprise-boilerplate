import { forwardRef, useId } from 'react';

import { ErrorMessage } from '../../base/ErrorMessage';
import { HelperText } from '../../base/HelperText';
import { Label } from '../../base/Label';
import { Textarea } from '../../base/Textarea';
import { getFieldRootClassName } from '../field/field.styles';
import { buildAriaDescribedBy } from '../field/fieldAccessibility';
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
      id: idProp,
      disabled,
      size,
      'aria-describedby': ariaDescribedByProp,
      ...textareaProps
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
      <div className={getFieldRootClassName({ className })}>
        {label ? (
          <Label htmlFor={id} required={required} disabled={disabled} size={size}>
            {label}
          </Label>
        ) : null}

        <Textarea
          {...textareaProps}
          ref={ref}
          id={id}
          disabled={disabled}
          size={size}
          invalid={hasError}
          aria-describedby={ariaDescribedBy}
          className={textareaRootClassName}
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

TextareaField.displayName = 'TextareaField';
