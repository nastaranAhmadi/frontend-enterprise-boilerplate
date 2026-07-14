import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { DateTimePicker } from './DateTimePicker';

describe('DateTimePicker', () => {
  it('opens the combined panel', async () => {
    const user = userEvent.setup();
    render(<DateTimePicker defaultValue="2026-07-13T09:30" locale="en" />);

    await user.click(screen.getByRole('button', { name: 'Open date and time picker' }));
    expect(screen.getByRole('dialog', { name: 'Choose date and time' })).toBeInTheDocument();
    expect(screen.getByRole('grid')).toBeInTheDocument();
  });

  it('applies the selected date and time', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <DateTimePicker
        locale="en"
        defaultOpen
        onChange={onChange}
        defaultValue="2026-07-13T12:00"
      />,
    );

    await user.click(screen.getByRole('button', { name: /July 15, 2026/i }));
    await user.click(screen.getByRole('button', { name: 'Apply' }));

    expect(onChange).toHaveBeenCalledWith(expect.stringMatching(/^2026-07-15T\d{2}:\d{2}$/));
  });
});
