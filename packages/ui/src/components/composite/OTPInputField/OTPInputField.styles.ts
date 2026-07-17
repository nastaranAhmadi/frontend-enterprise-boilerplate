const joinClassNames = (...classes: Array<string | undefined | false>): string =>
  classes.filter(Boolean).join(' ');

/** Centers label, helper, and error text above/below the OTP cell row. */
export const OTP_INPUT_FIELD_ROOT_CLASS = 'items-center text-center';

export const OTP_INPUT_FIELD_LABEL_CLASS = 'justify-center';

export const getOTPInputFieldRootClassName = ({
  className,
}: {
  className?: string;
} = {}): string => joinClassNames(OTP_INPUT_FIELD_ROOT_CLASS, className);
