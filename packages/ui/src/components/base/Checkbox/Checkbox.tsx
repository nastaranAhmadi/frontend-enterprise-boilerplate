import { forwardRef } from 'react';

import { getCheckboxClassName, getRootClassName } from './Checkbox.styles';
import type { CheckboxProps } from './Checkbox.types';

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(props, ref) {
  const { size, className, invalid, disabled, ...checkboxProps } = props;

  return (
    <div className={getRootClassName({ className })}>
      <input
        {...checkboxProps}
        ref={ref}
        type="checkbox"
        disabled={disabled}
        aria-invalid={invalid || undefined}
        className={getCheckboxClassName({ size, invalid })}
      />
    </div>
  );
});

Checkbox.displayName = 'Checkbox';
