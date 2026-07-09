import { forwardRef, useId } from 'react';

import { Checkbox } from '../../base/Checkbox';
import { ErrorMessage } from '../../base/ErrorMessage';
import { HelperText } from '../../base/HelperText';
import { Label } from '../../base/Label';
import { getFieldRootClassName } from '../field/field.styles';
import { buildAriaDescribedBy } from '../field/fieldAccessibility';
import { getCheckboxFieldControlRowClassName } from './CheckboxField.styles';
import type { CheckboxFieldProps } from './CheckboxField.types';

export const CheckboxField = forwardRef<HTMLInputElement, CheckboxFieldProps>(
  function CheckboxField(props, ref) {
    const {
      label,
      helperText,
      error: errorMessage,
      required,
      className,
      checkboxRootClassName,
      id: idProp,
      disabled,
      size,
      'aria-describedby': ariaDescribedByProp,
      ...checkboxProps
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
        <div className={getCheckboxFieldControlRowClassName({})}>
          <Checkbox
            {...checkboxProps}
            ref={ref}
            id={id}
            disabled={disabled}
            size={size}
            invalid={hasError}
            aria-describedby={ariaDescribedBy}
            className={checkboxRootClassName}
          />

          {label ? (
            <Label htmlFor={id} required={required} disabled={disabled} size={size}>
              {label}
            </Label>
          ) : null}
        </div>

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

CheckboxField.displayName = 'CheckboxField';
