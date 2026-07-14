import type { ComponentProps, ReactElement } from 'react';
import { useMemo, useState } from 'react';

import { Chip } from '../../base/Chip';
import { DataTable } from './DataTable';
import type { TableColumnDef } from './DataTable.types';
import { TableRow } from './Table';

interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  location: string;
  status: 'Active' | 'Away' | 'Inactive';
  score: number;
}

const employees: Employee[] = [
  {
    id: '1',
    name: 'Ada Lovelace',
    role: 'Engineer',
    department: 'Platform',
    location: 'London',
    status: 'Active',
    score: 98,
  },
  {
    id: '2',
    name: 'Grace Hopper',
    role: 'Architect',
    department: 'Infrastructure',
    location: 'New York',
    status: 'Active',
    score: 95,
  },
  {
    id: '3',
    name: 'Katherine Johnson',
    role: 'Analyst',
    department: 'Data',
    location: 'Remote',
    status: 'Away',
    score: 92,
  },
  {
    id: '4',
    name: 'Alan Turing',
    role: 'Researcher',
    department: 'AI',
    location: 'Cambridge',
    status: 'Inactive',
    score: 99,
  },
];

const columns: TableColumnDef<Employee>[] = [
  {
    id: 'name',
    label: 'Name',
    accessor: 'name',
    sortable: true,
    header: ({ column }) => (
      <span className="inline-flex items-center gap-xs">
        <span aria-hidden="true">👤</span>
        {column.label}
      </span>
    ),
  },
  { id: 'role', label: 'Role', accessor: 'role', sortable: true },
  { id: 'department', label: 'Department', accessor: 'department', hideable: true },
  { id: 'location', label: 'Location', accessor: 'location', hideable: true },
  {
    id: 'status',
    label: 'Status',
    accessor: 'status',
    hideable: true,
    cell: ({ value }) => (
      <Chip
        size="small"
        color={value === 'Active' ? 'success' : value === 'Away' ? 'warning' : 'neutral'}
      >
        {String(value)}
      </Chip>
    ),
  },
  {
    id: 'score',
    label: 'Score',
    accessor: 'score',
    sortable: true,
    hideable: true,
    align: 'end',
    cell: ({ value }) => <strong>{String(value)}</strong>,
  },
];

const meta = {
  title: 'Composite/Table/DataTable',
  component: DataTable,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story: () => ReactElement) => (
      <div style={{ width: '100%', maxWidth: 960 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

const StatefulDataTable = (props: Partial<ComponentProps<typeof DataTable<Employee>>>) => {
  const rows = props.rows ?? employees;
  const tableColumns = props.columns ?? columns;
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
  const [visibleColumnIds, setVisibleColumnIds] = useState(
    props.defaultVisibleColumnIds ?? ['name', 'role', 'department', 'status', 'score'],
  );
  const [sort, setSort] = useState(props.sort ?? null);

  const toolbar = useMemo(
    () => (
      <span className="text-sm text-muted-foreground">
        {selectedRowIds.length > 0
          ? `${String(selectedRowIds.length)} selected`
          : `${String(rows.length)} employees`}
      </span>
    ),
    [rows.length, selectedRowIds.length],
  );

  return (
    <DataTable
      {...props}
      rows={rows}
      columns={tableColumns}
      selectable
      selectedRowIds={selectedRowIds}
      onSelectionChange={setSelectedRowIds}
      visibleColumnIds={visibleColumnIds}
      onVisibleColumnIdsChange={setVisibleColumnIds}
      sort={sort}
      onSortChange={setSort}
      toolbar={toolbar}
      striped
      bordered
    />
  );
};

export const Playground = {
  render: () => <StatefulDataTable />,
};

export const CustomRows = {
  render: () => (
    <DataTable
      columns={columns}
      rows={employees}
      showColumnPicker={false}
      renderRow={({ children, row, selected }) => (
        <TableRow
          selected={selected}
          className={row.status === 'Inactive' ? 'opacity-60' : undefined}
        >
          {children}
        </TableRow>
      )}
    />
  ),
};

export const HiddenColumns = {
  render: () => <StatefulDataTable defaultVisibleColumnIds={['name', 'role', 'status']} />,
};
