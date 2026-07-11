import {
  type ChangeEvent,
  Children,
  cloneElement,
  isValidElement,
  type ReactElement,
  useId,
} from 'react';

import type { Size } from '../../../types';
import { ErrorMessage } from '../../base/ErrorMessage';
import { HelperText } from '../../base/HelperText';
import { FieldLegend } from '../../base/Label';
import type { RadioProps } from '../../base/Radio/Radio.types';
import { getFieldRootClassName } from '../field/field.styles';
import { buildAriaDescribedBy } from '../field/fieldAccessibility';
import { getRadioGroupOptionsClassName } from './RadioGroup.styles';
import type { RadioGroupProps } from './RadioGroup.types';

interface RadioGroupInjection {
  name?: string;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  invalid?: boolean;
  size?: Size;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const enhanceRadioChild = (
  child: ReactElement<RadioProps>,
  group: RadioGroupInjection,
): ReactElement<RadioProps> => {
  const isControlled = group.value !== undefined;
  const childValue = child.props.value;

  return cloneElement(child, {
    name: group.name ?? child.props.name,
    disabled: group.disabled ?? child.props.disabled,
    size: group.size ?? child.props.size,
    invalid: group.invalid ?? child.props.invalid,
    onChange: group.onChange ?? child.props.onChange,
    checked: isControlled ? group.value === childValue : child.props.checked,
    defaultChecked:
      !isControlled && group.defaultValue !== undefined
        ? group.defaultValue === childValue
        : child.props.defaultChecked,
  });
};

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

  const legendId = useId();
  const helperId = useId();
  const errorId = useId();

  const hasHelperText = Boolean(helperText);
  const hasError = Boolean(errorMessage);

  const ariaDescribedBy = buildAriaDescribedBy(
    hasHelperText ? helperId : undefined,
    hasError ? errorId : undefined,
  );

  const groupInjection: RadioGroupInjection = {
    name,
    value,
    defaultValue,
    disabled,
    invalid: hasError,
    size,
    onChange,
  };

  return (
    <div className={getFieldRootClassName({ className })}>
      <fieldset
        disabled={disabled}
        aria-describedby={ariaDescribedBy}
        aria-invalid={hasError || undefined}
      >
        {label ? (
          <FieldLegend id={legendId} required={required} disabled={disabled} size={size}>
            {label}
          </FieldLegend>
        ) : null}

        <div className={getRadioGroupOptionsClassName({})}>
          {Children.map(children, (child) => {
            if (!isValidElement<RadioProps>(child)) {
              return child;
            }

            return enhanceRadioChild(child, groupInjection);
          })}
        </div>
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
