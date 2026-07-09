import { forwardRef } from 'react';

import { getHelperTextClassName } from './HelperText.styles';
import type { HelperTextProps } from './HelperText.types';

export const HelperText = forwardRef<HTMLParagraphElement, HelperTextProps>(
  function HelperText(props, ref) {
    const { children, className, disabled, size, ...helperTextProps } = props;

    if (!children) {
      return null;
    }

    return (
      <p
        {...helperTextProps}
        ref={ref}
        className={getHelperTextClassName({ size, disabled, className })}
      >
        {children}
      </p>
    );
  },
);

HelperText.displayName = 'HelperText';
