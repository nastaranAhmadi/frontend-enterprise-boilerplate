import type { HTMLAttributes } from 'react';

import type { Size } from '../../../types';

export type LoadingVariant =
  | 'dots-3'
  | 'dot-bounce'
  | 'dots-5'
  | 'typing'
  | 'dot-matrix'
  | 'dots-bounce'
  | 'circular'
  | 'grid';

export interface LoadingOwnProps {
  className?: string;
  label?: string;
  size?: Size;
  variant?: LoadingVariant;
}

export type LoadingProps = LoadingOwnProps &
  Omit<HTMLAttributes<HTMLDivElement>, keyof LoadingOwnProps>;
