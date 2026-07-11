import { forwardRef, useId } from 'react';

import { Label } from '../Label';
import { getRadioClassName, getRootClassName } from './Radio.styles';
import type { RadioProps } from './Radio.types';

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(props, ref) {
  const { label, size, className, invalid, disabled, id: idProp, ...radioProps } = props;

  const generatedId = useId();
  const id = idProp ?? generatedId;

  return (
    <div className={getRootClassName({ className })}>
      <input
        {...radioProps}
        ref={ref}
        id={id}
        type="radio"
        disabled={disabled}
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
