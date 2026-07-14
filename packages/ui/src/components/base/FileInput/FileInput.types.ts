import type { HTMLAttributes, ReactNode } from 'react';

import type { Size } from '../../../types';

export type FileUploadItemStatus = 'pending' | 'uploading' | 'complete' | 'failed';

export type FileInputProgressVariant = 'bar' | 'fill';

export interface FileUploadItem {
  error?: string;
  file?: File;
  id: string;
  name: string;
  progress?: number;
  size: number;
  status: FileUploadItemStatus;
}

export interface FileInputOwnProps {
  accept?: string;
  className?: string;
  disabled?: boolean;
  files?: FileUploadItem[];
  hint?: ReactNode;
  invalid?: boolean;
  maxSize?: number;
  multiple?: boolean;
  onFileRemove?: (id: string) => void;
  onFileRetry?: (id: string) => void;
  onFilesAdd?: (files: File[]) => void;
  onFilesReject?: (files: File[], reason: 'type' | 'size') => void;
  progressVariant?: FileInputProgressVariant;
  size?: Size;
  subtitle?: ReactNode;
  title?: ReactNode;
}

export type FileInputProps = FileInputOwnProps &
  Omit<HTMLAttributes<HTMLDivElement>, keyof FileInputOwnProps | 'onChange' | 'title'>;
