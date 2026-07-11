import type { ToastPosition, ToastProps, ToastVariant } from './Toast.types';

const joinClassNames = (...classes: Array<string | undefined | false>): string =>
  classes.filter(Boolean).join(' ');

const normalizeVariant = (variant: ToastProps['variant']): ToastVariant => {
  if (variant === 'success' || variant === 'error' || variant === 'warning' || variant === 'info') {
    return variant;
  }
  return 'default';
};

const VARIANT_CLASS_MAP: Record<ToastVariant, string> = {
  default: 'border-border',
  success: 'border-success',
  error: 'border-error',
  warning: 'border-warning',
  info: 'border-info',
};

const POSITION_CLASS_MAP: Record<ToastPosition, string> = {
  'top-start': 'top-md start-md items-start',
  'top-center': 'top-md start-1/2 -translate-x-1/2 items-center',
  'top-end': 'top-md end-md items-end',
  'bottom-start': 'bottom-md start-md items-start',
  'bottom-center': 'bottom-md start-1/2 -translate-x-1/2 items-center',
  'bottom-end': 'bottom-md end-md items-end',
};

export const TOAST_VIEWPORT_CLASS =
  'pointer-events-none fixed z-toast flex w-full max-w-sm flex-col gap-sm';

export const TOAST_BASE_CLASS =
  'pointer-events-auto flex w-full items-start gap-sm rounded-md border border-s-4 bg-background p-md font-sans shadow-md';

export const TOAST_CONTENT_CLASS = 'flex min-w-0 flex-1 flex-col gap-xs';
export const TOAST_TITLE_CLASS = 'text-md font-medium text-foreground';
export const TOAST_DESCRIPTION_CLASS = 'text-sm text-muted';
export const TOAST_ACTIONS_CLASS = 'flex shrink-0 items-center gap-xs';
export const TOAST_DISMISS_BUTTON_CLASS =
  'inline-flex shrink-0 cursor-pointer rounded-sm border-0 bg-transparent p-0 text-lg leading-none text-muted transition-colors duration-normal hover:text-foreground';

export const getToastViewportClassName = ({
  position = 'top-end',
  className,
}: {
  position?: ToastPosition;
  className?: string;
} = {}): string => joinClassNames(TOAST_VIEWPORT_CLASS, POSITION_CLASS_MAP[position], className);

export const getToastClassName = ({
  variant,
  className,
}: Pick<ToastProps, 'variant'> & { className?: string }): string =>
  joinClassNames(TOAST_BASE_CLASS, VARIANT_CLASS_MAP[normalizeVariant(variant)], className);
