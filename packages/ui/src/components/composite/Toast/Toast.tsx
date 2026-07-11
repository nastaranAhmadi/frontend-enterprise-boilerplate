import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

import {
  getToastClassName,
  getToastViewportClassName,
  TOAST_ACTIONS_CLASS,
  TOAST_CONTENT_CLASS,
  TOAST_DESCRIPTION_CLASS,
  TOAST_DISMISS_BUTTON_CLASS,
  TOAST_TITLE_CLASS,
} from './Toast.styles';
import type {
  ToastContextValue,
  ToastOptions,
  ToastProps,
  ToastProviderProps,
  ToastRecord,
} from './Toast.types';

const ToastContext = createContext<ToastContextValue | null>(null);

let toastIdCounter = 0;

const createToastId = (): string => {
  toastIdCounter += 1;
  return `toast-${String(toastIdCounter)}`;
};

export const useToast = (): ToastContextValue => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider.');
  }
  return context;
};

export const Toast = function Toast(props: ToastProps) {
  const {
    open,
    onClose,
    title,
    description,
    variant = 'default',
    action,
    dismissible = true,
    duration = 5000,
    className,
    ...toastProps
  } = props;

  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open || !duration || duration <= 0) return;

    const timer = window.setTimeout(() => {
      onCloseRef.current();
    }, duration);

    return () => {
      window.clearTimeout(timer);
    };
  }, [duration, open]);

  if (!open) {
    return null;
  }

  const isError = variant === 'error';

  return (
    <div
      {...toastProps}
      role={isError ? 'alert' : 'status'}
      aria-live={isError ? 'assertive' : 'polite'}
      className={getToastClassName({ variant, className })}
    >
      <div className={TOAST_CONTENT_CLASS}>
        {title ? <div className={TOAST_TITLE_CLASS}>{title}</div> : null}
        {description ? <div className={TOAST_DESCRIPTION_CLASS}>{description}</div> : null}
      </div>

      {action || dismissible ? (
        <div className={TOAST_ACTIONS_CLASS}>
          {action}
          {dismissible ? (
            <button
              type="button"
              aria-label="Dismiss notification"
              className={TOAST_DISMISS_BUTTON_CLASS}
              onClick={onClose}
            >
              ×
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

Toast.displayName = 'Toast';

export const ToastProvider = function ToastProvider(props: ToastProviderProps) {
  const { children, position = 'top-end', duration: defaultDuration = 5000, limit = 5 } = props;
  const [toasts, setToasts] = useState<ToastRecord[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((current) =>
      current.map((toast) => (toast.id === id ? { ...toast, open: false } : toast)),
    );

    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, 200);
  }, []);

  const toast = useCallback(
    (options: ToastOptions): string => {
      const id = options.id ?? createToastId();
      const nextToast: ToastRecord = {
        ...options,
        id,
        open: true,
        duration: options.duration ?? defaultDuration,
      };

      setToasts((current) => {
        const withoutDuplicate = current.filter((item) => item.id !== id);
        return [nextToast, ...withoutDuplicate].slice(0, limit);
      });

      return id;
    },
    [defaultDuration, limit],
  );

  const contextValue = useMemo(() => ({ toast, dismiss }), [dismiss, toast]);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {typeof document !== 'undefined'
        ? createPortal(
            <div className={getToastViewportClassName({ position })}>
              {toasts.map((item) => (
                <Toast
                  key={item.id}
                  open={item.open}
                  title={item.title}
                  description={item.description}
                  variant={item.variant}
                  action={item.action}
                  dismissible={item.dismissible}
                  duration={item.duration}
                  className={item.className}
                  onClose={() => {
                    dismiss(item.id);
                  }}
                />
              ))}
            </div>,
            document.body,
          )
        : null}
    </ToastContext.Provider>
  );
};

ToastProvider.displayName = 'ToastProvider';
