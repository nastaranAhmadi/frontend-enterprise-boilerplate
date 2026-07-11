import type { HTMLAttributes, ReactNode } from 'react';

export type ToastVariant = 'default' | 'success' | 'error' | 'warning' | 'info';

export type ToastPosition =
  | 'top-start'
  | 'top-center'
  | 'top-end'
  | 'bottom-start'
  | 'bottom-center'
  | 'bottom-end';

export interface ToastOwnProps {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  description?: ReactNode;
  variant?: ToastVariant;
  action?: ReactNode;
  dismissible?: boolean;
  duration?: number;
  className?: string;
}

export type ToastProps = ToastOwnProps &
  Omit<HTMLAttributes<HTMLDivElement>, keyof ToastOwnProps | 'title'>;

export interface ToastOptions {
  id?: string;
  title?: ReactNode;
  description?: ReactNode;
  variant?: ToastVariant;
  action?: ReactNode;
  dismissible?: boolean;
  duration?: number;
  className?: string;
}

export interface ToastRecord extends ToastOptions {
  id: string;
  open: boolean;
}

export interface ToastContextValue {
  toast: (options: ToastOptions) => string;
  dismiss: (id: string) => void;
}

export interface ToastProviderProps {
  children?: ReactNode;
  position?: ToastPosition;
  /** Default auto-dismiss duration in ms. Set to 0 to disable. */
  duration?: number;
  /** Maximum number of visible toasts. */
  limit?: number;
}
