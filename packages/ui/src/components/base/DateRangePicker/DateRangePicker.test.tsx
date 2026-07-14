import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import type { DateRangeValue } from '../../../date/time';
import { DateRangePicker } from './DateRangePicker';

const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

describe('DateRangePicker', () => {
  it('opens the range panel with presets', async () => {
    const user = userEvent.setup();
    render(<DateRangePicker locale="en" />);

    await user.click(screen.getByRole('button', { name: 'Open date range picker' }));
    expect(screen.getByRole('dialog', { name: 'Choose date range' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Today' })).toBeInTheDocument();
  });

  it('applies a preset range', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn<(value: DateRangeValue) => void>();

    render(<DateRangePicker locale="en" defaultOpen onChange={onChange} />);

    await user.click(screen.getByRole('option', { name: 'Today' }));
    await user.click(screen.getByRole('button', { name: 'Apply' }));

    expect(onChange).toHaveBeenCalledTimes(1);
    const range = onChange.mock.calls[0]?.[0];
    expect(range?.start).toMatch(ISO_DATE_PATTERN);
    expect(range?.end).toMatch(ISO_DATE_PATTERN);
    expect(range?.start).toBe(range?.end);
  });
});
