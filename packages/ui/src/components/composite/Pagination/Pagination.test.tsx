import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { DesignSystemProvider } from '../../../providers/DesignSystemProvider';
import { Pagination } from './Pagination';

describe('Pagination', () => {
  it('renders navigation controls and current page', () => {
    render(<Pagination page={2} totalPages={5} onPageChange={() => undefined} />);

    expect(screen.getByRole('navigation', { name: 'Pagination' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Page 2' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('button', { name: 'Next page' })).toBeEnabled();
    expect(screen.getByRole('button', { name: 'Previous page' })).toBeEnabled();
  });

  it('calls onPageChange when a page is selected', async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();

    render(<Pagination page={2} totalPages={5} onPageChange={onPageChange} />);
    await user.click(screen.getByRole('button', { name: 'Page 4' }));

    expect(onPageChange).toHaveBeenCalledWith(4);
  });

  it('disables boundary navigation on the first and last pages', () => {
    const { rerender } = render(
      <Pagination page={1} totalPages={5} onPageChange={() => undefined} />,
    );

    expect(screen.getByRole('button', { name: 'First page' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Previous page' })).toBeDisabled();

    rerender(<Pagination page={5} totalPages={5} onPageChange={() => undefined} />);
    expect(screen.getByRole('button', { name: 'Next page' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Last page' })).toBeDisabled();
  });

  it('disables all controls when disabled', () => {
    render(<Pagination page={2} totalPages={5} disabled onPageChange={() => undefined} />);

    expect(screen.getByRole('button', { name: 'Page 2' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Next page' })).toBeDisabled();
  });

  it('supports keyboard activation on page buttons', async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();

    render(<Pagination page={2} totalPages={5} onPageChange={onPageChange} />);
    screen.getByRole('button', { name: 'Page 3' }).focus();
    await user.keyboard('{Enter}');

    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it('syncs out-of-range page values with onPageChange', () => {
    const onPageChange = vi.fn();

    render(<Pagination page={99} totalPages={5} onPageChange={onPageChange} />);

    expect(onPageChange).toHaveBeenCalledWith(5);
    expect(screen.getByRole('button', { name: 'Page 5' })).toHaveAttribute('aria-current', 'page');
  });

  it('mirrors navigation icons when dir is rtl', () => {
    render(<Pagination page={2} totalPages={5} onPageChange={() => undefined} dir="rtl" />);

    expect(screen.getByRole('button', { name: 'First page' })).toHaveTextContent('»');
    expect(screen.getByRole('button', { name: 'Previous page' })).toHaveTextContent('›');
    expect(screen.getByRole('button', { name: 'Next page' })).toHaveTextContent('‹');
    expect(screen.getByRole('button', { name: 'Last page' })).toHaveTextContent('«');
  });

  it('inherits rtl direction from DesignSystemProvider when dir is omitted', () => {
    render(
      <DesignSystemProvider locale="fa-IR">
        <Pagination page={2} totalPages={5} onPageChange={() => undefined} />
      </DesignSystemProvider>,
    );

    expect(screen.getByRole('navigation', { name: 'Pagination' })).toHaveAttribute('dir', 'rtl');
    expect(screen.getByRole('button', { name: 'Next page' })).toHaveTextContent('‹');
  });
});
