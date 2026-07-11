import type { HTMLAttributes, ReactNode } from 'react';

export type ModalSize = 'small' | 'medium' | 'large' | 'full';

export interface ModalOwnProps {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  className?: string;
  contentClassName?: string;
  size?: ModalSize;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
}

export type ModalProps = ModalOwnProps &
  Omit<HTMLAttributes<HTMLDivElement>, keyof ModalOwnProps | 'title'>;
