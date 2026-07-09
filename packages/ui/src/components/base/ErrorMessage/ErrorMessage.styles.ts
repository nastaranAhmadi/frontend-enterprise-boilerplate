import type { ErrorMessageProps } from './ErrorMessage.types';

type ErrorMessageSize = NonNullable<ErrorMessageProps['size']>;

export const ERROR_MESSAGE_BASE_CLASS = 'font-sans text-error';

const TEXT_SIZE_CLASS_MAP: Record<ErrorMessageSize, string> = {
  small: 'text-sm',
  medium: 'text-md',
  large: 'text-lg',
};

const joinClassNames = (...classes: Array<string | undefined | false>): string =>
  classes.filter(Boolean).join(' ');

const normalizeSize = (size: ErrorMessageProps['size']): ErrorMessageSize => {
  if (size === 'small') return 'small';
  if (size === 'large') return 'large';
  return 'medium';
};

const sizeClasses = (size: ErrorMessageProps['size']): string =>
  TEXT_SIZE_CLASS_MAP[normalizeSize(size)];

export const getErrorMessageClassName = ({
  size,
  className,
}: Pick<ErrorMessageProps, 'size'> & { className?: string }): string =>
  joinClassNames(ERROR_MESSAGE_BASE_CLASS, sizeClasses(size), className);
