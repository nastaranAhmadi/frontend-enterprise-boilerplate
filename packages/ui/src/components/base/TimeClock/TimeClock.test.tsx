import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { TimeClock } from './TimeClock';

describe('TimeClock', () => {
  it('calls onChange when hour and minute are selected', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<TimeClock value="09:00" onChange={onChange} minuteStep={15} />);

    const hourList = screen.getByRole('listbox', { name: 'Hour' });
    const minuteList = screen.getByRole('listbox', { name: 'Minute' });

    await user.click(within(hourList).getByRole('option', { name: '14' }));
    expect(onChange).toHaveBeenCalledWith('14:00');

    onChange.mockClear();
    await user.click(within(minuteList).getByRole('option', { name: '30' }));
    expect(onChange).toHaveBeenCalledWith('09:30');
  });

  it('supports 12-hour AM/PM selection', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<TimeClock ampm value="09:00" onChange={onChange} />);

    const periodList = screen.getByRole('listbox', { name: 'AM or PM' });
    await user.click(within(periodList).getByRole('option', { name: 'PM' }));
    expect(onChange).toHaveBeenCalledWith('21:00');
  });

  it('clamps period changes outside min/max time bounds', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<TimeClock ampm value="09:00" minTime="08:00" maxTime="10:00" onChange={onChange} />);

    const hourList = screen.getByRole('listbox', { name: 'Hour' });
    expect(within(hourList).getByRole('option', { name: '11' })).toBeDisabled();

    const periodList = screen.getByRole('listbox', { name: 'AM or PM' });
    await user.click(within(periodList).getByRole('option', { name: 'PM' }));
    expect(onChange).toHaveBeenCalledWith('10:00');
  });

  it('does not call onChange when disabled', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<TimeClock value="09:00" disabled onChange={onChange} />);

    const hourList = screen.getByRole('listbox', { name: 'Hour' });
    await user.click(within(hourList).getByRole('option', { name: '14' }));
    expect(onChange).not.toHaveBeenCalled();
  });
});
