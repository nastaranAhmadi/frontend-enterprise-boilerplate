import type { TableColumnDef, TableSortDirection, TableSortState } from './DataTable.types';

export const getColumnLabel = <T>(column: TableColumnDef<T>): string => column.label ?? column.id;

export const getDefaultVisibleColumnIds = <T>(columns: TableColumnDef<T>[]): string[] =>
  columns.filter((column) => column.defaultVisible !== false).map((column) => column.id);

export const getVisibleColumns = <T>(
  columns: TableColumnDef<T>[],
  visibleColumnIds: string[],
): TableColumnDef<T>[] => {
  const visibleSet = new Set(visibleColumnIds);
  return columns.filter((column) => visibleSet.has(column.id));
};

export const getRowValue = <T>(row: T, column: TableColumnDef<T>): unknown => {
  if (!column.accessor) {
    return undefined;
  }

  if (typeof column.accessor === 'function') {
    return column.accessor(row);
  }

  return row[column.accessor];
};

const toComparableString = (value: unknown): string => {
  if (typeof value === 'string') {
    return value;
  }

  if (typeof value === 'number' || typeof value === 'boolean' || typeof value === 'bigint') {
    return String(value);
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  if (typeof value === 'symbol') {
    return value.toString();
  }

  return JSON.stringify(value);
};

const compareValues = (left: unknown, right: unknown): number => {
  if (left == null && right == null) {
    return 0;
  }

  if (left == null) {
    return 1;
  }

  if (right == null) {
    return -1;
  }

  if (left instanceof Date && right instanceof Date) {
    return left.getTime() - right.getTime();
  }

  if (typeof left === 'number' && typeof right === 'number') {
    return left - right;
  }

  return toComparableString(left).localeCompare(toComparableString(right), undefined, {
    numeric: true,
    sensitivity: 'base',
  });
};

export const sortRows = <T>(
  rows: T[],
  columns: TableColumnDef<T>[],
  sort: TableSortState | null,
): T[] => {
  if (!sort) {
    return rows;
  }

  const column = columns.find((entry) => entry.id === sort.columnId);
  if (!column || !column.sortable) {
    return rows;
  }

  const getSortValue =
    column.sortValue ?? ((row: T) => getRowValue(row, column) as string | number | Date);

  const directionMultiplier = sort.direction === 'asc' ? 1 : -1;

  return [...rows].sort(
    (left, right) => compareValues(getSortValue(left), getSortValue(right)) * directionMultiplier,
  );
};

export const getNextSortState = (
  current: TableSortState | null,
  columnId: string,
): TableSortState | null => {
  if (!current || current.columnId !== columnId) {
    return { columnId, direction: 'asc' };
  }

  if (current.direction === 'asc') {
    return { columnId, direction: 'desc' };
  }

  return null;
};

export const getSortDirectionForColumn = (
  sort: TableSortState | null,
  columnId: string,
): TableSortDirection | null => (sort?.columnId === columnId ? sort.direction : null);

export const toggleRowSelection = (
  selectedRowIds: string[],
  rowId: string,
  selected: boolean,
): string[] => {
  if (selected) {
    return selectedRowIds.includes(rowId) ? selectedRowIds : [...selectedRowIds, rowId];
  }

  return selectedRowIds.filter((id) => id !== rowId);
};

export const toggleAllRowSelection = (
  selectedRowIds: string[],
  rowIds: string[],
  selected: boolean,
): string[] => {
  if (!selected) {
    return selectedRowIds.filter((id) => !rowIds.includes(id));
  }

  return Array.from(new Set([...selectedRowIds, ...rowIds]));
};

export const toggleColumnVisibility = (
  visibleColumnIds: string[],
  columnId: string,
  visible: boolean,
  allColumnIds: string[],
): string[] => {
  if (visible) {
    const next = visibleColumnIds.includes(columnId)
      ? visibleColumnIds
      : [...visibleColumnIds, columnId];
    return allColumnIds.filter((id) => next.includes(id));
  }

  const next = visibleColumnIds.filter((id) => id !== columnId);
  return allColumnIds.filter((id) => next.includes(id));
};
