import { forwardRef } from 'react';

import {
  getAdornmentClassName,
  getControlClassName,
  getRootClassName,
  getSelectClassName,
} from './Select.styles';
import type { SelectProps } from './Select.types';

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(props, ref) {
  const {
    startAdornment,
    endAdornment,
    size,
    variant,
    className,
    invalid,
    disabled,
    children,
    ...selectProps
  } = props;

  const adornmentClassName = getAdornmentClassName({ size });

  return (
    <div className={getRootClassName({ className })}>
      <div className={getControlClassName({ size, variant, invalid, disabled })}>
        {startAdornment ? <span className={adornmentClassName}>{startAdornment}</span> : null}

        <select
          {...selectProps}
          ref={ref}
          disabled={disabled}
          aria-invalid={invalid || undefined}
          className={getSelectClassName()}
        >
          {children}
        </select>

        {endAdornment ? <span className={adornmentClassName}>{endAdornment}</span> : null}
      </div>
    </div>
  );
});

Select.displayName = 'Select';
