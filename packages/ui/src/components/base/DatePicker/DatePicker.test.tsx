import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { DatePicker } from './DatePicker';

describe('DatePicker', () => {
  it('renders placeholder when empty', () => {
    render(<DatePicker placeholder="Select date" />);
    expect(screen.getByPlaceholderText('Select date')).toBeInTheDocument();
  });

  it('opens the calendar panel', async () => {
    const user = userEvent.setup();
    render(<DatePicker defaultValue="2026-07-13" locale="en" />);

    await user.click(screen.getByRole('button', { name: 'Open calendar' }));

    expect(screen.getByRole('dialog', { name: 'Choose date' })).toBeInTheDocument();
    expect(screen.getByRole('grid')).toBeInTheDocument();
  });

  it('calls onChange when a date is selected', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <DatePicker
        locale="en"
        calendar="gregorian"
        onChange={onChange}
        defaultOpen
        defaultValue={null}
      />,
    );

    const dayButton = screen.getByRole('button', { name: /July 15, 2026/i });
    await user.click(dayButton);

    expect(onChange).toHaveBeenCalledWith('2026-07-15');
  });

  it('clears the selected value', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<DatePicker defaultOpen defaultValue="2026-07-13" onChange={onChange} locale="en" />);

    await user.click(screen.getByRole('button', { name: 'Clear' }));
    expect(onChange).toHaveBeenCalledWith(null);
  });

  it('does not open when disabled', async () => {
    const user = userEvent.setup();
    render(<DatePicker disabled defaultValue="2026-07-13" />);

    await user.click(screen.getByRole('button', { name: 'Open calendar' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
