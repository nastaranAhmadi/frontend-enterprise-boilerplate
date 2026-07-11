import type { HTMLAttributes, ReactNode } from 'react';

import type { Size } from '../../../types';

export type BottomSheetSize = Size | 'auto';

export interface BottomSheetOwnProps {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  className?: string;
  contentClassName?: string;
  size?: BottomSheetSize;
  showHandle?: boolean;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
}

export type BottomSheetProps = BottomSheetOwnProps &
  Omit<HTMLAttributes<HTMLDivElement>, keyof BottomSheetOwnProps | 'title'>;
