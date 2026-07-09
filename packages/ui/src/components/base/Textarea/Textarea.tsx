import { forwardRef } from 'react';

import { getControlClassName, getRootClassName, getTextareaClassName } from './Textarea.styles';
import type { TextareaProps } from './Textarea.types';

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(props, ref) {
    const { size, variant, className, invalid, disabled, ...textareaProps } = props;

    return (
      <div className={getRootClassName({ className })}>
        <div className={getControlClassName({ size, variant, invalid, disabled })}>
          <textarea
            {...textareaProps}
            ref={ref}
            disabled={disabled}
            aria-invalid={invalid || undefined}
            className={getTextareaClassName()}
          />
        </div>
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';
