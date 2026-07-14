import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { DataTable } from './DataTable';
import type { TableColumnDef } from './DataTable.types';
import { TableRow } from './Table';

interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  location: string;
  status: string;
}

const employees: Employee[] = [
  {
    id: '1',
    name: 'Ada Lovelace',
    role: 'Engineer',
    department: 'Platform',
    location: 'London',
    status: 'Active',
  },
  {
    id: '2',
    name: 'Grace Hopper',
    role: 'Architect',
    department: 'Infra',
    location: 'New York',
    status: 'Active',
  },
  {
    id: '3',
    name: 'Katherine Johnson',
    role: 'Analyst',
    department: 'Data',
    location: 'Remote',
    status: 'Away',
  },
];

const columns: TableColumnDef<Employee>[] = [
  {
    id: 'name',
    label: 'Name',
    accessor: 'name',
    sortable: true,
    header: ({ column }) => <span>👤 {column.label}</span>,
  },
  { id: 'role', label: 'Role', accessor: 'role', sortable: true },
  { id: 'department', label: 'Department', accessor: 'department', hideable: true },
  { id: 'location', label: 'Location', accessor: 'location', hideable: true },
  {
    id: 'status',
    label: 'Status',
    accessor: 'status',
    cell: ({ value }) => <strong>{String(value)}</strong>,
  },
];

describe('DataTable', () => {
  it('renders sortable headers and custom cell content', () => {
    render(<DataTable columns={columns} rows={employees} showColumnPicker={false} />);

    expect(screen.getByRole('columnheader', { name: /Name/i })).toHaveAttribute(
      'aria-sort',
      'none',
    );
    expect(screen.getAllByText('Active').length).toBeGreaterThan(0);
  });

  it('sorts rows when a sortable header is clicked', async () => {
    const user = userEvent.setup();
    render(<DataTable columns={columns} rows={employees} showColumnPicker={false} />);

    const nameHeader = screen.getByRole('columnheader', { name: /Name/i });
    expect(nameHeader).toHaveAttribute('aria-sort', 'none');

    await user.click(screen.getByRole('button', { name: /Name/i }));

    expect(nameHeader).toHaveAttribute('aria-sort', 'ascending');
    const cells = screen.getAllByRole('cell').map((cell) => cell.textContent);
    expect(cells[0]).toContain('Ada Lovelace');
  });

  it('supports multi-row selection', async () => {
    const user = userEvent.setup();
    const onSelectionChange = vi.fn();

    render(
      <DataTable
        columns={columns}
        rows={employees}
        selectable
        showColumnPicker={false}
        onSelectionChange={onSelectionChange}
      />,
    );

    await user.click(screen.getByRole('checkbox', { name: 'Select row 1' }));
    expect(onSelectionChange).toHaveBeenCalledWith(['1']);
  });

  it('toggles column visibility from the picker', async () => {
    const user = userEvent.setup();

    render(
      <DataTable
        columns={columns}
        rows={employees}
        defaultVisibleColumnIds={['name', 'role', 'department', 'location', 'status']}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Columns' }));
    await user.click(screen.getByRole('checkbox', { name: 'Toggle Location column' }));

    expect(screen.queryByRole('columnheader', { name: 'Location' })).not.toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /Name/i })).toBeInTheDocument();
  });

  it('supports custom row rendering', () => {
    render(
      <DataTable
        columns={columns}
        rows={employees.slice(0, 1)}
        showColumnPicker={false}
        renderRow={({ children, row, selected }) => (
          <TableRow selected={selected} data-testid={`row-${row.id}`}>
            {children}
          </TableRow>
        )}
      />,
    );

    expect(screen.getByTestId('row-1')).toBeInTheDocument();
  });
});
