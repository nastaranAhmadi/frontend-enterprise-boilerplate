import { forwardRef } from 'react';

import { getLabelClassName, REQUIRED_INDICATOR, REQUIRED_INDICATOR_CLASS } from './Label.styles';
import type { LabelProps } from './Label.types';

export const Label = forwardRef<HTMLLabelElement, LabelProps>(function Label(props, ref) {
  const { children, className, disabled, required, size, ...labelProps } = props;

  return (
    <label {...labelProps} ref={ref} className={getLabelClassName({ size, disabled, className })}>
      {children}
      {required ? (
        <span aria-hidden="true" className={REQUIRED_INDICATOR_CLASS}>
          {REQUIRED_INDICATOR}
        </span>
      ) : null}
    </label>
  );
});

Label.displayName = 'Label';
