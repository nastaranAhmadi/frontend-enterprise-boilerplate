import type { Size } from '../../../types';
import type { PaginationProps } from './Pagination.types';

const joinClassNames = (...classes: Array<string | undefined | false>): string =>
  classes.filter(Boolean).join(' ');

const normalizeSize = (size: PaginationProps['size']): Size => {
  if (size === 'small') return 'small';
  if (size === 'large') return 'large';
  return 'medium';
};

const GAP_CLASS_MAP: Record<Size, string> = {
  small: 'gap-1',
  medium: 'gap-xs',
  large: 'gap-sm',
};

export const PAGINATION_ROOT_CLASS = 'inline-flex max-w-full flex-wrap items-center font-sans';
export const PAGINATION_ITEMS_CLASS = 'inline-flex max-w-full flex-wrap items-center';
export const PAGINATION_ELLIPSIS_CLASS =
  'inline-flex min-w-8 items-center justify-center text-muted-foreground';

export const getPaginationRootClassName = ({
  size,
  className,
}: Pick<PaginationProps, 'size'> & { className?: string }): string =>
  joinClassNames(PAGINATION_ROOT_CLASS, GAP_CLASS_MAP[normalizeSize(size)], className);

export const getPaginationItemsClassName = ({ size }: Pick<PaginationProps, 'size'>): string =>
  joinClassNames(PAGINATION_ITEMS_CLASS, GAP_CLASS_MAP[normalizeSize(size)]);

export const getPaginationEllipsisClassName = ({ size }: Pick<PaginationProps, 'size'>): string => {
  const textClass =
    normalizeSize(size) === 'small'
      ? 'text-sm'
      : normalizeSize(size) === 'large'
        ? 'text-lg'
        : 'text-md';

  return joinClassNames(PAGINATION_ELLIPSIS_CLASS, textClass);
};
