import { createContext, forwardRef, useContext, useId } from 'react';

import { Label } from '../Label';
import { getRadioClassName, getRootClassName } from './Radio.styles';
import type { RadioProps } from './Radio.types';

export interface RadioGroupContextValue {
  name?: string;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  invalid?: boolean;
  size?: RadioProps['size'];
  onChange?: RadioProps['onChange'];
}

export const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export const useRadioGroupContext = (): RadioGroupContextValue | null =>
  useContext(RadioGroupContext);

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(props, ref) {
  const {
    label,
    size: sizeProp,
    className,
    invalid: invalidProp,
    disabled: disabledProp,
    id: idProp,
    name: nameProp,
    value,
    checked: checkedProp,
    defaultChecked: defaultCheckedProp,
    onChange: onChangeProp,
    ...radioProps
  } = props;

  const group = useRadioGroupContext();
  const generatedId = useId();
  const id = idProp ?? generatedId;

  const name = nameProp ?? group?.name;
  const disabled = disabledProp ?? group?.disabled;
  const size = sizeProp ?? group?.size;
  const invalid = invalidProp ?? group?.invalid;
  const onChange = onChangeProp ?? group?.onChange;

  const isGroupControlled = group?.value !== undefined;
  const checked =
    checkedProp !== undefined ? checkedProp : isGroupControlled ? group.value === value : undefined;

  const defaultChecked =
    defaultCheckedProp !== undefined
      ? defaultCheckedProp
      : !isGroupControlled && group?.defaultValue !== undefined
        ? group.defaultValue === value
        : undefined;

  return (
    <div className={getRootClassName({ className })}>
      <input
        {...radioProps}
        ref={ref}
        id={id}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        onChange={onChange}
        className={getRadioClassName({ size, invalid })}
      />

      {label ? (
        <Label htmlFor={id} disabled={disabled} size={size}>
          {label}
        </Label>
      ) : null}
    </div>
  );
});

Radio.displayName = 'Radio';
