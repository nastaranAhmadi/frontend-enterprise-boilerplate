import type { HTMLAttributes, ReactNode } from 'react';

import type { Size } from '../../../types';

export interface PaginationOwnProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
  siblingCount?: number;
  boundaryCount?: number;
  size?: Size;
  className?: string;
  showFirstLast?: boolean;
  'aria-label'?: string;
  renderPageLabel?: (page: number) => ReactNode;
}

export type PaginationProps = PaginationOwnProps &
  Omit<HTMLAttributes<HTMLElement>, keyof PaginationOwnProps>;
