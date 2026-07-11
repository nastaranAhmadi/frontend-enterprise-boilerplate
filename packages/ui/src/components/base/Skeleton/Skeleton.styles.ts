import type { SkeletonProps, SkeletonVariant } from './Skeleton.types';

type SkeletonSize = NonNullable<SkeletonProps['size']>;

export const SKELETON_BASE_CLASS = 'inline-block bg-muted';

const VARIANT_CLASS_MAP: Record<SkeletonVariant, string> = {
  text: 'w-full rounded-sm',
  circular: 'rounded-full',
  rectangular: 'w-full rounded-none',
  rounded: 'w-full rounded-md',
};

const TEXT_SIZE_CLASS_MAP: Record<SkeletonSize, string> = {
  small: 'h-sm',
  medium: 'h-md',
  large: 'h-lg',
};

const CIRCULAR_SIZE_CLASS_MAP: Record<SkeletonSize, string> = {
  small: 'h-sm w-sm',
  medium: 'h-md w-md',
  large: 'h-lg w-lg',
};

const joinClassNames = (...classes: Array<string | undefined | false>): string =>
  classes.filter(Boolean).join(' ');

const normalizeSize = (size: SkeletonProps['size']): SkeletonSize => {
  if (size === 'small') return 'small';
  if (size === 'large') return 'large';
  return 'medium';
};

const variantClasses = (variant: SkeletonProps['variant']): string => {
  if (variant === 'text') return VARIANT_CLASS_MAP.text;
  if (variant === 'circular') return VARIANT_CLASS_MAP.circular;
  if (variant === 'rectangular') return VARIANT_CLASS_MAP.rectangular;
  return VARIANT_CLASS_MAP.rounded;
};

const sizeClasses = (variant: SkeletonProps['variant'], size: SkeletonProps['size']): string => {
  const resolvedSize = normalizeSize(size);

  if (variant === 'circular') {
    return CIRCULAR_SIZE_CLASS_MAP[resolvedSize];
  }

  return TEXT_SIZE_CLASS_MAP[resolvedSize];
};

export const getSkeletonClassName = ({
  variant,
  size,
  animate,
  className,
}: Pick<SkeletonProps, 'variant' | 'size' | 'animate'> & { className?: string }): string =>
  joinClassNames(
    SKELETON_BASE_CLASS,
    variantClasses(variant),
    sizeClasses(variant, size),
    animate && 'animate-pulse',
    className,
  );
