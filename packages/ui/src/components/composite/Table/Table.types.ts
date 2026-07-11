import type { HTMLAttributes, ReactNode, TdHTMLAttributes, ThHTMLAttributes } from 'react';

import type { Size } from '../../../types';

export interface TableOwnProps {
  children?: ReactNode;
  className?: string;
  wrapperClassName?: string;
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
  children?: ReactNode;
  className?: string;
  scope?: 'col' | 'row';
}

export type TableHeadProps = TableHeadOwnProps &
  Omit<ThHTMLAttributes<HTMLTableCellElement>, keyof TableHeadOwnProps>;

export interface TableCellOwnProps {
  children?: ReactNode;
  className?: string;
}

export type TableCellProps = TableCellOwnProps &
  Omit<TdHTMLAttributes<HTMLTableCellElement>, keyof TableCellOwnProps>;
