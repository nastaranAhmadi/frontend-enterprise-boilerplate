import { useId } from 'react';

import { ErrorMessage } from '../../base/ErrorMessage';
import { HelperText } from '../../base/HelperText';
import {
  getLabelClassName,
  REQUIRED_INDICATOR,
  REQUIRED_INDICATOR_CLASS,
} from '../../base/Label/Label.styles';
import { RadioGroupContext } from '../../base/Radio';
import { getFieldRootClassName } from '../field/field.styles';
import { buildAriaDescribedBy } from '../field/fieldAccessibility';
import { getRadioGroupOptionsClassName } from './RadioGroup.styles';
import type { RadioGroupProps } from './RadioGroup.types';

export const RadioGroup = function RadioGroup(props: RadioGroupProps) {
  const {
    label,
    helperText,
    error: errorMessage,
    required,
    className,
    name,
    value,
    defaultValue,
    disabled,
    size,
    onChange,
    children,
  } = props;

  const labelId = useId();
  const helperId = useId();
  const errorId = useId();

  const hasHelperText = Boolean(helperText);
  const hasError = Boolean(errorMessage);

  const ariaDescribedBy = buildAriaDescribedBy(
    hasHelperText ? helperId : undefined,
    hasError ? errorId : undefined,
  );

  return (
    <div className={getFieldRootClassName({ className })}>
      <fieldset
        disabled={disabled}
        aria-describedby={ariaDescribedBy}
        aria-invalid={hasError || undefined}
      >
        {label ? (
          <legend className={getLabelClassName({ size, disabled })} id={labelId}>
            {label}
            {required ? (
              <span aria-hidden="true" className={REQUIRED_INDICATOR_CLASS}>
                {REQUIRED_INDICATOR}
              </span>
            ) : null}
          </legend>
        ) : null}

        <RadioGroupContext.Provider
          value={{
            name,
            value,
            defaultValue,
            disabled,
            invalid: hasError,
            size,
            onChange,
          }}
        >
          <div className={getRadioGroupOptionsClassName({})}>{children}</div>
        </RadioGroupContext.Provider>
      </fieldset>

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
};

RadioGroup.displayName = 'RadioGroup';
