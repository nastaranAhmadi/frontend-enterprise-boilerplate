import { forwardRef } from 'react';

import { getErrorMessageClassName } from './ErrorMessage.styles';
import type { ErrorMessageProps } from './ErrorMessage.types';

export const ErrorMessage = forwardRef<HTMLParagraphElement, ErrorMessageProps>(
  function ErrorMessage(props, ref) {
    const { children, className, size, role = 'alert', ...errorMessageProps } = props;

    if (!children) {
      return null;
    }

    return (
      <p
        {...errorMessageProps}
        ref={ref}
        role={role}
        className={getErrorMessageClassName({ size, className })}
      >
        {children}
      </p>
    );
  },
);

ErrorMessage.displayName = 'ErrorMessage';
