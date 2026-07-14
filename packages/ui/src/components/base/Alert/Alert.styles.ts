import type { AlertProps, AlertVariant } from './Alert.types';

const joinClassNames = (...classes: Array<string | undefined | false>): string =>
  classes.filter(Boolean).join(' ');

const normalizeVariant = (variant: AlertProps['variant']): AlertVariant => {
  if (
    variant === 'success' ||
    variant === 'error' ||
    variant === 'warning' ||
    variant === 'info' ||
    variant === 'neutral'
  ) {
    return variant;
  }

  return 'neutral';
};

const VARIANT_CLASS_MAP: Record<AlertVariant, string> = {
  success: 'border-success bg-success/10 text-foreground',
  error: 'border-error bg-error/10 text-foreground',
  warning: 'border-warning bg-warning/10 text-foreground',
  info: 'border-info bg-info/10 text-foreground',
  neutral: 'border-border bg-muted text-foreground',
};

const VARIANT_ICON_CLASS_MAP: Record<AlertVariant, string> = {
  success: 'text-success',
  error: 'text-error',
  warning: 'text-warning',
  info: 'text-info',
  neutral: 'text-muted',
};

export const ALERT_BASE_CLASS =
  'relative flex w-full items-start gap-sm rounded-md border border-s-4 p-md font-sans';

export const ALERT_ICON_CLASS = 'mt-0.5 inline-flex shrink-0 items-center justify-center';

export const ALERT_CONTENT_CLASS = 'flex min-w-0 flex-1 flex-col gap-xs';

export const ALERT_TITLE_CLASS = 'text-md font-medium text-foreground';

export const ALERT_DESCRIPTION_CLASS = 'text-sm text-muted';

export const ALERT_CLOSE_BUTTON_CLASS =
  'inline-flex shrink-0 cursor-pointer rounded-sm border-0 bg-transparent p-0 text-lg leading-none text-muted transition-colors duration-normal hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary';

export const getAlertClassName = ({
  variant,
  className,
}: Pick<AlertProps, 'variant'> & { className?: string }): string =>
  joinClassNames(ALERT_BASE_CLASS, VARIANT_CLASS_MAP[normalizeVariant(variant)], className);

export const getAlertIconClassName = (variant: AlertProps['variant']): string =>
  joinClassNames(ALERT_ICON_CLASS, VARIANT_ICON_CLASS_MAP[normalizeVariant(variant)]);
