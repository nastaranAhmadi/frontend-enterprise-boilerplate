import { Fragment, type ReactNode, useEffect, useMemo, useRef } from 'react';

import { useControllableState } from '../../../hooks/useControllableState';
import { Checkbox } from '../../base/Checkbox';
import {
  DATA_TABLE_EMPTY_CLASS,
  DATA_TABLE_SELECTION_CELL_CLASS,
  DATA_TABLE_TOOLBAR_ACTIONS_CLASS,
  DATA_TABLE_TOOLBAR_CLASS,
} from './DataTable.styles';
import type {
  DataTableProps,
  TableCellRenderContext,
  TableColumnDef,
  TableHeaderRenderContext,
  TableSortState,
} from './DataTable.types';
import {
  getDefaultVisibleColumnIds,
  getNextSortState,
  getRowValue,
  getSortDirectionForColumn,
  getVisibleColumns,
  sortRows,
  toggleAllRowSelection,
  toggleColumnVisibility,
  toggleRowSelection,
} from './dataTable.utils';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './Table';
import { TableColumnPicker } from './TableColumnPicker';

const defaultGetRowId = (row: unknown, index: number): string => {
  if (row && typeof row === 'object' && 'id' in row) {
    const id = (row as { id?: string | number }).id;
    if (id != null) {
      return String(id);
    }
  }

  return String(index);
};

const renderHeaderContent = <T,>(
  column: TableColumnDef<T>,
  context: TableHeaderRenderContext<T>,
): ReactNode => {
  if (typeof column.header === 'function') {
    return column.header(context);
  }

  return column.header ?? column.label ?? column.id;
};

const renderCellContent = <T,>(context: TableCellRenderContext<T>): ReactNode => {
  if (context.column.cell) {
    return context.column.cell(context);
  }

  const value = context.value;
  if (value == null || value === '') {
    return '—';
  }

  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  return JSON.stringify(value);
};

export const DataTable = <T,>(props: DataTableProps<T>) => {
  const {
    bordered,
    className,
    columnPickerLabel = 'Columns',
    columns,
    defaultSelectedRowIds = [],
    defaultSort = null,
    defaultVisibleColumnIds,
    getRowId = defaultGetRowId,
    layout,
    onSelectionChange,
    onSortChange,
    onVisibleColumnIdsChange,
    renderRow,
    rows,
    selectable = false,
    selectedRowIds,
    showColumnPicker = true,
    size,
    sort,
    striped,
    toolbar,
    visibleColumnIds,
    wrapperClassName,
    ...tableProps
  } = props;

  const allColumnIds = useMemo(() => columns.map((column) => column.id), [columns]);
  const resolvedDefaultVisibleColumnIds = useMemo(
    () => defaultVisibleColumnIds ?? getDefaultVisibleColumnIds(columns),
    [columns, defaultVisibleColumnIds],
  );

  const { value: resolvedVisibleColumnIds, setValue: setVisibleColumnIds } = useControllableState({
    value: visibleColumnIds,
    defaultValue: resolvedDefaultVisibleColumnIds,
    onChange: onVisibleColumnIdsChange,
  });

  const { value: resolvedSort, setValue: setSort } = useControllableState<TableSortState | null>({
    value: sort,
    defaultValue: defaultSort,
    onChange: onSortChange,
  });

  const { value: resolvedSelectedRowIds, setValue: setSelectedRowIds } = useControllableState({
    value: selectedRowIds,
    defaultValue: defaultSelectedRowIds,
    onChange: onSelectionChange,
  });

  const visibleColumns = useMemo(
    () => getVisibleColumns(columns, resolvedVisibleColumnIds),
    [columns, resolvedVisibleColumnIds],
  );

  const sortedRows = useMemo(
    () => sortRows(rows, columns, resolvedSort),
    [columns, resolvedSort, rows],
  );

  const rowEntries = useMemo(
    () => sortedRows.map((row, index) => ({ row, rowId: getRowId(row, index), index })),
    [getRowId, sortedRows],
  );

  const rowIds = useMemo(() => rowEntries.map((entry) => entry.rowId), [rowEntries]);

  const allSelected =
    rowIds.length > 0 && rowIds.every((id) => resolvedSelectedRowIds.includes(id));
  const someSelected = rowIds.some((id) => resolvedSelectedRowIds.includes(id)) && !allSelected;

  const selectAllRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate = someSelected;
    }
  }, [someSelected]);

  const handleToggleSort = (columnId: string) => {
    setSort(getNextSortState(resolvedSort, columnId));
  };

  const handleToggleColumn = (columnId: string, visible: boolean) => {
    setVisibleColumnIds(
      toggleColumnVisibility(resolvedVisibleColumnIds, columnId, visible, allColumnIds),
    );
  };

  const showToolbar = Boolean(toolbar) || showColumnPicker;

  return (
    <div className={wrapperClassName}>
      {showToolbar ? (
        <div className={DATA_TABLE_TOOLBAR_CLASS}>
          <div>{toolbar}</div>
          <div className={DATA_TABLE_TOOLBAR_ACTIONS_CLASS}>
            {showColumnPicker ? (
              <TableColumnPicker
                columns={columns}
                label={columnPickerLabel}
                visibleColumnIds={resolvedVisibleColumnIds}
                onToggle={handleToggleColumn}
              />
            ) : null}
          </div>
        </div>
      ) : null}

      <Table
        {...tableProps}
        bordered={bordered}
        className={className}
        layout={layout}
        size={size}
        striped={striped}
      >
        <TableHeader>
          <TableRow>
            {selectable ? (
              <TableHead scope="col" className={DATA_TABLE_SELECTION_CELL_CLASS}>
                <Checkbox
                  ref={selectAllRef}
                  checked={allSelected}
                  onChange={(event) => {
                    setSelectedRowIds(
                      toggleAllRowSelection(resolvedSelectedRowIds, rowIds, event.target.checked),
                    );
                  }}
                  aria-label="Select all rows"
                />
              </TableHead>
            ) : null}

            {visibleColumns.map((column) => {
              const sortDirection = getSortDirectionForColumn(resolvedSort, column.id);
              const headerContext: TableHeaderRenderContext<T> = {
                column,
                sortDirection,
                toggleSort: () => {
                  handleToggleSort(column.id);
                },
              };

              return (
                <TableHead
                  key={column.id}
                  align={column.align}
                  className={column.headerClassName}
                  sortable={column.sortable}
                  sortDirection={sortDirection}
                  onSort={() => {
                    handleToggleSort(column.id);
                  }}
                  style={column.width ? { width: column.width } : undefined}
                >
                  {renderHeaderContent(column, headerContext)}
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>

        <TableBody>
          {rowEntries.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={visibleColumns.length + (selectable ? 1 : 0)}
                className={DATA_TABLE_EMPTY_CLASS}
              >
                No data available
              </TableCell>
            </TableRow>
          ) : (
            rowEntries.map(({ row, rowId, index }) => {
              const selected = resolvedSelectedRowIds.includes(rowId);

              const cells = (
                <>
                  {selectable ? (
                    <TableCell className={DATA_TABLE_SELECTION_CELL_CLASS}>
                      <Checkbox
                        checked={selected}
                        onChange={(event) => {
                          setSelectedRowIds(
                            toggleRowSelection(resolvedSelectedRowIds, rowId, event.target.checked),
                          );
                        }}
                        aria-label={`Select row ${rowId}`}
                      />
                    </TableCell>
                  ) : null}

                  {visibleColumns.map((column) => {
                    const cellContext: TableCellRenderContext<T> = {
                      column,
                      row,
                      rowId,
                      rowIndex: index,
                      value: getRowValue(row, column),
                    };

                    return (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        className={column.className}
                        label={column.stackedLabel ?? column.label ?? column.id}
                        style={column.width ? { width: column.width } : undefined}
                      >
                        {renderCellContent(cellContext)}
                      </TableCell>
                    );
                  })}
                </>
              );

              if (renderRow) {
                return (
                  <Fragment key={rowId}>
                    {renderRow({
                      children: cells,
                      row,
                      rowId,
                      rowIndex: index,
                      selected,
                    })}
                  </Fragment>
                );
              }

              return (
                <TableRow key={rowId} selected={selected}>
                  {cells}
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
};

DataTable.displayName = 'DataTable';
