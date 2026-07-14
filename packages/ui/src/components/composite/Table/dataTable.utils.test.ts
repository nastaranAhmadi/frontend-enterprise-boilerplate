import { describe, expect, it } from 'vitest';

import type { TableColumnDef } from './DataTable.types';
import {
  getDefaultVisibleColumnIds,
  getNextSortState,
  getRowValue,
  getVisibleColumns,
  sortRows,
  toggleColumnVisibility,
  toggleRowSelection,
} from './dataTable.utils';

interface SampleRow {
  id: string;
  name: string;
  role: string;
  score: number;
}

const columns: TableColumnDef<SampleRow>[] = [
  { id: 'name', label: 'Name', accessor: 'name', sortable: true },
  { id: 'role', label: 'Role', accessor: 'role', sortable: true },
  { id: 'score', label: 'Score', accessor: 'score', sortable: true, hideable: true },
];

const rows: SampleRow[] = [
  { id: '1', name: 'Charlie', role: 'Engineer', score: 80 },
  { id: '2', name: 'Ada', role: 'Architect', score: 95 },
  { id: '3', name: 'Grace', role: 'Analyst', score: 88 },
];

describe('dataTable.utils', () => {
  it('sorts rows ascending and descending', () => {
    const ascending = sortRows(rows, columns, { columnId: 'name', direction: 'asc' });
    expect(ascending.map((row) => row.name)).toEqual(['Ada', 'Charlie', 'Grace']);

    const descending = sortRows(rows, columns, { columnId: 'score', direction: 'desc' });
    expect(descending.map((row) => row.score)).toEqual([95, 88, 80]);
  });

  it('cycles sort state', () => {
    expect(getNextSortState(null, 'name')).toEqual({ columnId: 'name', direction: 'asc' });
    expect(getNextSortState({ columnId: 'name', direction: 'asc' }, 'name')).toEqual({
      columnId: 'name',
      direction: 'desc',
    });
    expect(getNextSortState({ columnId: 'name', direction: 'desc' }, 'name')).toBeNull();
  });

  it('filters visible columns and toggles visibility', () => {
    const defaults = getDefaultVisibleColumnIds(columns);
    expect(defaults).toEqual(['name', 'role', 'score']);

    const hidden = toggleColumnVisibility(defaults, 'score', false, defaults);
    expect(getVisibleColumns(columns, hidden).map((column) => column.id)).toEqual(['name', 'role']);
  });

  it('toggles row selection', () => {
    expect(toggleRowSelection(['1'], '2', true)).toEqual(['1', '2']);
    expect(toggleRowSelection(['1', '2'], '2', false)).toEqual(['1']);
  });

  it('reads row values from accessors', () => {
    const firstRow = rows[0];
    const nameColumn = columns[0];
    if (!firstRow || !nameColumn) {
      throw new Error('Expected fixture row and name column');
    }

    expect(getRowValue(firstRow, nameColumn)).toBe('Charlie');
    expect(
      getRowValue(firstRow, {
        id: 'custom',
        accessor: (row) => row.role.toUpperCase(),
      }),
    ).toBe('ENGINEER');
  });
});
