import type { HTMLAttributes, ReactNode } from 'react';

import type { Size } from '../../../types';

export interface InfiniteListOwnProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  loading?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
  /** IntersectionObserver rootMargin used to prefetch the next page before the sentinel is visible. */
  loadMoreRootMargin?: string;
  loader?: ReactNode;
  endMessage?: ReactNode;
  emptyState?: ReactNode;
  error?: ReactNode;
  onRetry?: () => void;
  size?: Size;
  className?: string;
  itemClassName?: string;
  listClassName?: string;
  getItemKey?: (item: T, index: number) => string | number;
  'aria-label'?: string;
}

export type InfiniteListProps<T> = InfiniteListOwnProps<T> &
  Omit<HTMLAttributes<HTMLDivElement>, keyof InfiniteListOwnProps<T>>;
