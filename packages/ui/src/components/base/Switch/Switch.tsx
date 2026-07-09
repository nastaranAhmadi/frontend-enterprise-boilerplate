import { forwardRef } from 'react';

import { getInputClassName, getRootClassName, getTrackClassName } from './Switch.styles';
import type { SwitchProps } from './Switch.types';

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(props, ref) {
  const { size, className, invalid, disabled, checked, defaultChecked, ...switchProps } = props;

  return (
    <div className={getRootClassName({ className })}>
      <input
        {...switchProps}
        ref={ref}
        type="checkbox"
        role="switch"
        disabled={disabled}
        checked={checked}
        defaultChecked={defaultChecked}
        aria-invalid={invalid || undefined}
        className={getInputClassName({ disabled })}
      />
      <span aria-hidden="true" className={getTrackClassName({ size, invalid })} />
    </div>
  );
});

Switch.displayName = 'Switch';
