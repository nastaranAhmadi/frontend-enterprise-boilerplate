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
        ref={ref}
        className={getErrorMessageClassName({ size, className })}
        role={role}
        {...errorMessageProps}
      >
        {children}
      </p>
    );
  },
);

ErrorMessage.displayName = 'ErrorMessage';
