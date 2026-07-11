import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './Table';
import {
  TABLE_BORDERED_CLASS,
  TABLE_ROW_SELECTED_CLASS,
  TABLE_ROW_STRIPED_CLASS,
} from './Table.styles';

describe('Table', () => {
  it('renders semantic table structure', () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Ada</TableCell>
            <TableCell>Engineer</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Name' })).toHaveAttribute('scope', 'col');
    expect(screen.getByRole('cell', { name: 'Ada' })).toBeInTheDocument();
  });

  it('forwards ref to the table element', () => {
    const ref = createRef<HTMLTableElement>();
    render(
      <Table ref={ref}>
        <TableBody>
          <TableRow>
            <TableCell>Row</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    expect(ref.current).toBeInstanceOf(HTMLTableElement);
  });

  it('applies striped and bordered classes', () => {
    const { container } = render(
      <Table striped bordered>
        <TableBody>
          <TableRow>
            <TableCell>Row</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    const table = container.querySelector('table');
    const row = container.querySelector('tr');

    expect(table?.className).toContain(TABLE_BORDERED_CLASS);
    expect(row?.className).toContain(TABLE_ROW_STRIPED_CLASS);
  });

  it('applies selected row class', () => {
    const { container } = render(
      <Table>
        <TableBody>
          <TableRow selected>
            <TableCell>Selected</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    expect(container.querySelector('tr')?.className).toContain(TABLE_ROW_SELECTED_CLASS);
  });

  it('applies wrapperClassName to the scroll container', () => {
    const { container } = render(
      <Table wrapperClassName="custom-wrapper">
        <TableBody>
          <TableRow>
            <TableCell>Row</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    expect(container.firstChild).toHaveClass('custom-wrapper');
  });
});
