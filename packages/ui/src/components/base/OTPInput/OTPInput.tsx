import {
  type ClipboardEvent,
  forwardRef,
  type KeyboardEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { delocalizeDigits } from '../../../date/digits';
import {
  getOTPInputCellClassName,
  getOTPInputGroupClassName,
  getOTPInputRootClassName,
  getOTPInputSeparatorClassName,
} from './OTPInput.styles';
import type { OTPInputLength, OTPInputProps } from './OTPInput.types';

const sanitizeDigits = (value: string, length: OTPInputLength): string =>
  delocalizeDigits(value).replace(/\D/g, '').slice(0, length);

const splitValue = (value: string, length: OTPInputLength): string[] => {
  const digits = sanitizeDigits(value, length).split('');
  return Array.from({ length }, (_, index) => digits[index] ?? '');
};

const useControllableValue = ({
  value,
  defaultValue = '',
  onChange,
  length,
}: Pick<OTPInputProps, 'value' | 'defaultValue' | 'onChange'> & { length: OTPInputLength }) => {
  const [uncontrolledValue, setUncontrolledValue] = useState(sanitizeDigits(defaultValue, length));
  const isControlled = value !== undefined;
  const currentValue = sanitizeDigits(isControlled ? value : uncontrolledValue, length);

  const setValue = useCallback(
    (nextValue: string) => {
      const resolved = sanitizeDigits(nextValue, length);

      if (!isControlled) {
        setUncontrolledValue(resolved);
      }

      onChange?.(resolved);
      return resolved;
    },
    [isControlled, length, onChange],
  );

  return { currentValue, setValue };
};

export const OTPInput = forwardRef<HTMLDivElement, OTPInputProps>(function OTPInput(props, ref) {
  const {
    'aria-label': ariaLabel = 'Verification code',
    autoFocus = false,
    className,
    defaultValue,
    // OTP codes are numeric sequences that must always read left-to-right.
    // Default to ltr so RTL page context doesn't reverse the cell order or
    // flip the text-caret direction inside each box.
    dir = 'ltr',
    disabled = false,
    id,
    invalid = false,
    length = 4,
    onChange,
    onComplete,
    separator = false,
    size = 'medium',
    value,
    ...rootProps
  } = props;

  const isRtl = dir === 'rtl';

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const { currentValue, setValue } = useControllableValue({
    defaultValue,
    length,
    onChange,
    value,
  });
  const digits = useMemo(() => splitValue(currentValue, length), [currentValue, length]);
  const showSeparator = separator && length === 6;

  useEffect(() => {
    if (currentValue.length === length) {
      onComplete?.(currentValue);
    }
  }, [currentValue, length, onComplete]);

  useEffect(() => {
    if (autoFocus && !disabled) {
      inputRefs.current[0]?.focus();
    }
  }, [autoFocus, disabled]);

  const focusAt = (index: number) => {
    const resolvedIndex = Math.min(Math.max(index, 0), length - 1);
    inputRefs.current[resolvedIndex]?.focus();
    inputRefs.current[resolvedIndex]?.select();
  };

  const updateDigit = (index: number, nextDigit: string) => {
    const nextDigits = [...digits];
    nextDigits[index] = nextDigit;
    const resolved = setValue(nextDigits.join(''));

    if (nextDigit && index < length - 1) {
      focusAt(index + 1);
    }

    return resolved;
  };

  const handleChange = (index: number, nextValue: string) => {
    const sanitized = sanitizeDigits(nextValue, length);

    if (sanitized.length > 1) {
      const merged = [...digits];
      sanitized.split('').forEach((digit, offset) => {
        if (index + offset < length) {
          merged[index + offset] = digit;
        }
      });
      setValue(merged.join(''));
      focusAt(Math.min(index + sanitized.length, length - 1));
      return;
    }

    updateDigit(index, sanitized);
  };

  const handleKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && !digits[index] && index > 0) {
      event.preventDefault();
      updateDigit(index - 1, '');
      focusAt(index - 1);
      return;
    }

    // In RTL the visual "previous" cell is to the right, so arrow directions flip.
    const prevKey = isRtl ? 'ArrowRight' : 'ArrowLeft';
    const nextKey = isRtl ? 'ArrowLeft' : 'ArrowRight';

    if (event.key === prevKey) {
      event.preventDefault();
      focusAt(index - 1);
      return;
    }

    if (event.key === nextKey) {
      event.preventDefault();
      focusAt(index + 1);
    }
  };

  const handlePaste = (index: number, event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pasted = event.clipboardData.getData('text');
    const sanitized = sanitizeDigits(pasted, length);

    if (!sanitized) {
      return;
    }

    const merged = [...digits];
    sanitized.split('').forEach((digit, offset) => {
      if (index + offset < length) {
        merged[index + offset] = digit;
      }
    });

    setValue(merged.join(''));
    focusAt(Math.min(index + sanitized.length - 1, length - 1));
  };

  return (
    <div
      ref={ref}
      role="group"
      aria-label={ariaLabel}
      dir={dir}
      className={getOTPInputRootClassName({ className })}
      {...rootProps}
    >
      <div className={getOTPInputGroupClassName()}>
        {digits.map((digit, index) => (
          <span key={`otp-cell-${String(index)}`} className="inline-flex items-center gap-sm">
            {showSeparator && index === 3 ? (
              <span aria-hidden="true" className={getOTPInputSeparatorClassName()}>
                -
              </span>
            ) : null}

            <input
              ref={(node) => {
                inputRefs.current[index] = node;
              }}
              id={index === 0 ? id : undefined}
              type="text"
              inputMode="numeric"
              autoComplete={index === 0 ? 'one-time-code' : 'off'}
              pattern="[0-9]*"
              maxLength={1}
              value={digit}
              disabled={disabled}
              aria-label={`Digit ${String(index + 1)} of ${String(length)}`}
              aria-invalid={invalid || undefined}
              className={getOTPInputCellClassName({ size, invalid, disabled })}
              onChange={(event) => {
                handleChange(index, event.target.value);
              }}
              onKeyDown={(event) => {
                handleKeyDown(index, event);
              }}
              onPaste={(event) => {
                handlePaste(index, event);
              }}
              onFocus={(event) => {
                event.currentTarget.select();
              }}
            />
          </span>
        ))}
      </div>
    </div>
  );
});

OTPInput.displayName = 'OTPInput';
