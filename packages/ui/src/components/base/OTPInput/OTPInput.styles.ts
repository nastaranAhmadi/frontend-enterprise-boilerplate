import type { OTPInputProps } from './OTPInput.types';

type OTPInputSize = NonNullable<OTPInputProps['size']>;

const joinClassNames = (...classes: Array<string | undefined | false>): string =>
  classes.filter(Boolean).join(' ');

export const OTP_INPUT_ROOT_CLASS = 'inline-flex w-full items-center justify-center font-sans';

export const OTP_INPUT_GROUP_CLASS = 'inline-flex items-center gap-sm';

export const OTP_INPUT_CELL_BASE_CLASS =
  'rounded-md border border-border bg-background text-center font-medium text-foreground transition-colors duration-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';

export const OTP_INPUT_CELL_INVALID_CLASS = 'border-error focus-visible:ring-error';

export const OTP_INPUT_SEPARATOR_CLASS = 'text-lg font-medium text-muted-foreground';

const CELL_SIZE_CLASS_MAP: Record<OTPInputSize, string> = {
  small: 'h-10 w-10 text-md',
  medium: 'h-12 w-12 text-lg',
  large: 'h-14 w-14 text-lg',
};

export const getOTPInputRootClassName = ({ className }: { className?: string } = {}): string =>
  joinClassNames(OTP_INPUT_ROOT_CLASS, className);

export const getOTPInputGroupClassName = ({ className }: { className?: string } = {}): string =>
  joinClassNames(OTP_INPUT_GROUP_CLASS, className);

export const getOTPInputCellClassName = ({
  size,
  invalid,
  disabled,
  className,
}: {
  size?: OTPInputProps['size'];
  invalid?: boolean;
  disabled?: boolean;
  className?: string;
}): string => {
  const resolvedSize: OTPInputSize = size === 'small' || size === 'large' ? size : 'medium';

  return joinClassNames(
    OTP_INPUT_CELL_BASE_CLASS,
    CELL_SIZE_CLASS_MAP[resolvedSize],
    invalid && OTP_INPUT_CELL_INVALID_CLASS,
    disabled && 'cursor-not-allowed opacity-50',
    className,
  );
};

export const getOTPInputSeparatorClassName = ({ className }: { className?: string } = {}): string =>
  joinClassNames(OTP_INPUT_SEPARATOR_CLASS, className);
