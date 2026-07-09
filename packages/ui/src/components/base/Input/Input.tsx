import { forwardRef } from 'react';

import {
  getAdornmentClassName,
  getControlClassName,
  getInputClassName,
  getRootClassName,
} from './Input.styles';
import type { InputProps } from './Input.types';

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(props, ref) {
  const {
    startAdornment,
    endAdornment,
    size,
    variant,
    className,
    invalid,
    disabled,
    ...inputProps
  } = props;

  const adornmentClassName = getAdornmentClassName({ size });

  return (
    <div className={getRootClassName({ className })}>
      <div className={getControlClassName({ size, variant, invalid, disabled })}>
        {startAdornment ? <span className={adornmentClassName}>{startAdornment}</span> : null}

        <input
          {...inputProps}
          ref={ref}
          disabled={disabled}
          aria-invalid={invalid || undefined}
          className={getInputClassName()}
        />

        {endAdornment ? <span className={adornmentClassName}>{endAdornment}</span> : null}
      </div>
    </div>
  );
});

Input.displayName = 'Input';
