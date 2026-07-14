import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Calendar } from './Calendar';

const JULY_VIEW = { year: 2026, month: 7 } as const;

describe('Calendar', () => {
  it('calls onSelect when a day is clicked', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();

    render(
      <Calendar
        view={JULY_VIEW}
        focusedIsoDate="2026-07-13"
        selectedIsoDate="2026-07-13"
        onSelect={onSelect}
        showFooter={false}
      />,
    );

    await user.click(screen.getByRole('button', { name: /July 15, 2026/i }));
    expect(onSelect).toHaveBeenCalledWith('2026-07-15');
  });

  it('moves focus with arrow keys and selects with Enter', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();

    render(
      <Calendar
        view={JULY_VIEW}
        selectedIsoDate="2026-07-13"
        onSelect={onSelect}
        showFooter={false}
      />,
    );

    const focusedDay = screen.getByRole('button', { name: /July 13, 2026/i });
    focusedDay.focus();
    expect(focusedDay).toHaveFocus();

    await user.keyboard('{ArrowRight}');
    await user.keyboard('{Enter}');
    expect(onSelect).toHaveBeenCalledWith('2026-07-14');
  });

  it('does not select disabled dates outside min/max bounds', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();

    render(
      <Calendar
        view={JULY_VIEW}
        focusedIsoDate="2026-07-13"
        selectedIsoDate="2026-07-13"
        onSelect={onSelect}
        showFooter={false}
        disableOptions={{
          minDate: '2026-07-10',
          maxDate: '2026-07-20',
          disabledDates: ['2026-07-15'],
        }}
      />,
    );

    expect(screen.getByRole('button', { name: /July 5, 2026/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /July 15, 2026/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /July 25, 2026/i })).toBeDisabled();

    await user.click(screen.getByRole('button', { name: /July 15, 2026/i }));
    expect(onSelect).not.toHaveBeenCalled();

    await user.click(screen.getByRole('button', { name: /July 16, 2026/i }));
    expect(onSelect).toHaveBeenCalledWith('2026-07-16');
  });

  it('does not select via keyboard when the focused date is out of bounds', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();

    render(
      <Calendar
        view={JULY_VIEW}
        focusedIsoDate="2026-07-05"
        selectedIsoDate={null}
        onSelect={onSelect}
        showFooter={false}
        disableOptions={{ minDate: '2026-07-10', maxDate: '2026-07-20' }}
      />,
    );

    const focusedDay = screen.getByRole('button', { name: /July 5, 2026/i });
    focusedDay.focus();
    await user.keyboard('{Enter}');
    expect(onSelect).not.toHaveBeenCalled();
  });
});
