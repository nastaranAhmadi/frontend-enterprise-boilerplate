import type {
  CSSProperties,
  HTMLAttributes,
  ReactNode,
  TdHTMLAttributes,
  ThHTMLAttributes,
} from 'react';

import type { Size } from '../../../types';

export type TableLayout = 'scroll' | 'stacked';

export interface TableOwnProps {
  children?: ReactNode;
  className?: string;
  wrapperClassName?: string;
  layout?: TableLayout;
  size?: Size;
  striped?: boolean;
  bordered?: boolean;
}

export type TableProps = TableOwnProps &
  Omit<HTMLAttributes<HTMLTableElement>, keyof TableOwnProps>;

export interface TableSectionOwnProps {
  children?: ReactNode;
  className?: string;
}

export type TableHeaderProps = TableSectionOwnProps &
  Omit<HTMLAttributes<HTMLTableSectionElement>, keyof TableSectionOwnProps>;

export type TableBodyProps = TableSectionOwnProps &
  Omit<HTMLAttributes<HTMLTableSectionElement>, keyof TableSectionOwnProps>;

export type TableFooterProps = TableSectionOwnProps &
  Omit<HTMLAttributes<HTMLTableSectionElement>, keyof TableSectionOwnProps>;

export interface TableRowOwnProps {
  children?: ReactNode;
  className?: string;
  selected?: boolean;
}

export type TableRowProps = TableRowOwnProps &
  Omit<HTMLAttributes<HTMLTableRowElement>, keyof TableRowOwnProps>;

export interface TableHeadOwnProps {
  align?: 'center' | 'end' | 'start';
  children?: ReactNode;
  className?: string;
  onSort?: () => void;
  scope?: 'col' | 'row';
  sortable?: boolean;
  sortDirection?: 'asc' | 'desc' | null;
  style?: CSSProperties;
}

export type TableHeadProps = TableHeadOwnProps &
  Omit<ThHTMLAttributes<HTMLTableCellElement>, keyof TableHeadOwnProps>;

export interface TableCellOwnProps {
  align?: 'center' | 'end' | 'start';
  children?: ReactNode;
  className?: string;
  /** Column label shown in stacked mobile layout (`layout="stacked"`). */
  label?: string;
  style?: CSSProperties;
}

export type TableCellProps = TableCellOwnProps &
  Omit<TdHTMLAttributes<HTMLTableCellElement>, keyof TableCellOwnProps>;
