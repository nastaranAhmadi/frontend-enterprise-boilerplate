import type { ReactNode } from 'react';

import type { TableProps } from './Table.types';

export type TableSortDirection = 'asc' | 'desc';

export interface TableSortState {
  columnId: string;
  direction: TableSortDirection;
}

export interface TableHeaderRenderContext<T> {
  column: TableColumnDef<T>;
  sortDirection: TableSortDirection | null;
  toggleSort: () => void;
}

export interface TableCellRenderContext<T> {
  column: TableColumnDef<T>;
  row: T;
  rowId: string;
  rowIndex: number;
  value: unknown;
}

export interface TableRowRenderContext<T> {
  children: ReactNode;
  row: T;
  rowId: string;
  rowIndex: number;
  selected: boolean;
}

export interface TableColumnDef<T> {
  id: string;
  /** Header label used for accessibility and the column picker when `header` is a render function. */
  label?: string;
  header?: ReactNode | ((context: TableHeaderRenderContext<T>) => ReactNode);
  accessor?: keyof T | ((row: T) => unknown);
  cell?: (context: TableCellRenderContext<T>) => ReactNode;
  sortable?: boolean;
  sortValue?: (row: T) => string | number | Date | null | undefined;
  /** Included in the column picker. Defaults to `true`. */
  hideable?: boolean;
  /** Visible on first render when column visibility is uncontrolled. Defaults to `true`. */
  defaultVisible?: boolean;
  /** Shown in stacked mobile layout via `TableCell label`. */
  stackedLabel?: string;
  align?: 'start' | 'center' | 'end';
  className?: string;
  headerClassName?: string;
  width?: string;
}

export interface DataTableOwnProps<T> {
  columns: TableColumnDef<T>[];
  rows: T[];
  className?: string;
  columnPickerLabel?: string;
  defaultSelectedRowIds?: string[];
  defaultSort?: TableSortState | null;
  defaultVisibleColumnIds?: string[];
  getRowId?: (row: T, index: number) => string;
  onSelectionChange?: (selectedRowIds: string[]) => void;
  onSortChange?: (sort: TableSortState | null) => void;
  onVisibleColumnIdsChange?: (visibleColumnIds: string[]) => void;
  renderRow?: (context: TableRowRenderContext<T>) => ReactNode;
  selectable?: boolean;
  selectedRowIds?: string[];
  showColumnPicker?: boolean;
  sort?: TableSortState | null;
  toolbar?: ReactNode;
  visibleColumnIds?: string[];
  wrapperClassName?: string;
}

export type DataTableProps<T> = DataTableOwnProps<T> &
  Omit<TableProps, keyof DataTableOwnProps<T> | 'children' | 'className' | 'wrapperClassName'>;
