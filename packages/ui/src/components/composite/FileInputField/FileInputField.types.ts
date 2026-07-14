import type { FileInputProps } from '../../base/FileInput';

export interface FileInputFieldOwnProps {
  'aria-describedby'?: string;
  className?: string;
  error?: string;
  fileInputRootClassName?: string;
  helperText?: string;
  id?: string;
  label?: string;
  required?: boolean;
}

export type FileInputFieldProps = FileInputFieldOwnProps &
  Omit<FileInputProps, keyof FileInputFieldOwnProps | 'invalid' | 'className'>;
