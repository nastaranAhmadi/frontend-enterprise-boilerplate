import { forwardRef } from 'react';

import { getSkeletonClassName } from './Skeleton.styles';
import type { SkeletonProps } from './Skeleton.types';

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(function Skeleton(props, ref) {
  const {
    variant = 'rounded',
    size = 'medium',
    animate = true,
    className,
    'aria-hidden': ariaHidden = true,
    ...skeletonProps
  } = props;

  return (
    <div
      {...skeletonProps}
      ref={ref}
      aria-hidden={ariaHidden}
      className={getSkeletonClassName({ variant, size, animate, className })}
    />
  );
});

Skeleton.displayName = 'Skeleton';
