import { forwardRef, useId } from 'react';

import { ErrorMessage } from '../../base/ErrorMessage';
import { HelperText } from '../../base/HelperText';
import { Label } from '../../base/Label';
import { Select } from '../../base/Select';
import { getSelectFieldClassName } from './SelectField.styles';
import type { SelectFieldProps } from './SelectField.types';

const buildAriaDescribedBy = (...ids: Array<string | undefined>): string | undefined => {
  const value = ids.filter(Boolean).join(' ');
  return value || undefined;
};

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  function SelectField(props, ref) {
    const {
      label,
      helperText,
      error: errorMessage,
      required,
      className,
      selectRootClassName,
      children,
      id: idProp,
      disabled,
      size,
      'aria-describedby': ariaDescribedByProp,
      ...selectProps
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
      <div className={getSelectFieldClassName({ className })}>
        {label ? (
          <Label htmlFor={id} required={required} disabled={disabled} size={size}>
            {label}
          </Label>
        ) : null}

        <Select
          {...selectProps}
          ref={ref}
          id={id}
          disabled={disabled}
          size={size}
          invalid={hasError}
          aria-describedby={ariaDescribedBy}
          className={selectRootClassName}
        >
          {children}
        </Select>

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

SelectField.displayName = 'SelectField';
