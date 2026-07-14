import { forwardRef, type ReactNode } from 'react';

import {
  ALERT_CLOSE_BUTTON_CLASS,
  ALERT_CONTENT_CLASS,
  ALERT_DESCRIPTION_CLASS,
  ALERT_TITLE_CLASS,
  getAlertClassName,
  getAlertIconClassName,
} from './Alert.styles';
import type { AlertProps, AlertVariant } from './Alert.types';

const CheckIcon = () => (
  <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 20 20">
    <path
      d="M16.667 5.833 8.125 14.375 3.333 9.583"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
);

const ErrorIcon = () => (
  <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 20 20">
    <path
      d="M10 6.667v4.166M10 14.167h.008M17.5 10a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
);

const WarningIcon = () => (
  <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 20 20">
    <path
      d="M10 7.5v3.333M10 13.333h.008M8.525 3.508 1.908 14.167a1.667 1.667 0 0 0 1.442 2.5h13.3a1.667 1.667 0 0 0 1.442-2.5L11.475 3.508a1.667 1.667 0 0 0-2.95 0Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
);

const InfoIcon = () => (
  <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 20 20">
    <path
      d="M10 13.333V10M10 6.667h.008M17.5 10a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
);

const DEFAULT_ICONS: Record<AlertVariant, ReactNode> = {
  success: <CheckIcon />,
  error: <ErrorIcon />,
  warning: <WarningIcon />,
  info: <InfoIcon />,
  neutral: <InfoIcon />,
};

export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  const {
    children,
    className,
    closeLabel = 'Dismiss',
    icon,
    onClose,
    role,
    title,
    variant = 'neutral',
    ...alertProps
  } = props;

  const resolvedRole = role ?? (variant === 'error' || variant === 'warning' ? 'alert' : 'status');
  const resolvedIcon = icon === false ? null : (icon ?? DEFAULT_ICONS[variant]);

  return (
    <div
      {...alertProps}
      ref={ref}
      role={resolvedRole}
      className={getAlertClassName({ variant, className })}
    >
      {resolvedIcon ? <span className={getAlertIconClassName(variant)}>{resolvedIcon}</span> : null}

      <div className={ALERT_CONTENT_CLASS}>
        {title ? <div className={ALERT_TITLE_CLASS}>{title}</div> : null}
        {children ? <div className={ALERT_DESCRIPTION_CLASS}>{children}</div> : null}
      </div>

      {onClose ? (
        <button
          type="button"
          className={ALERT_CLOSE_BUTTON_CLASS}
          onClick={onClose}
          aria-label={closeLabel}
        >
          ×
        </button>
      ) : null}
    </div>
  );
});

Alert.displayName = 'Alert';
