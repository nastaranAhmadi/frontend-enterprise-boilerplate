import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { TimePicker } from './TimePicker';

describe('TimePicker', () => {
  it('opens the time panel', async () => {
    const user = userEvent.setup();
    render(<TimePicker defaultValue="09:30" locale="en" />);

    await user.click(screen.getByRole('button', { name: 'Open time picker' }));
    expect(screen.getByRole('dialog', { name: 'Choose time' })).toBeInTheDocument();
  });

  it('calls onChange when a time is selected', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<TimePicker locale="en" defaultOpen onChange={onChange} minuteStep={15} />);

    const minuteList = screen.getByRole('listbox', { name: 'Minute' });
    await user.click(within(minuteList).getByRole('option', { name: '15' }));
    expect(onChange).toHaveBeenCalledWith('00:15');
  });
});
