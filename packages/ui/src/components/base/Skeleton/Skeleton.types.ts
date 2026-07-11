import type { HTMLAttributes } from 'react';

import type { Size } from '../../../types';

export type SkeletonVariant = 'text' | 'circular' | 'rectangular' | 'rounded';

export interface SkeletonOwnProps {
  variant?: SkeletonVariant;
  size?: Size;
  animate?: boolean;
  className?: string;
}

export type SkeletonProps = SkeletonOwnProps &
  Omit<HTMLAttributes<HTMLDivElement>, keyof SkeletonOwnProps>;
