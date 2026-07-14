import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef, useState } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { OTPInput } from './OTPInput';

const getOtpCells = () => {
  const cells = screen.getAllByRole('textbox');
  expect(cells.length).toBeGreaterThan(0);
  return cells;
};

const requireCell = (cells: HTMLElement[], index: number): HTMLElement => {
  const cell = cells[index];
  if (!cell) {
    throw new Error(`Expected OTP cell at index ${String(index)}`);
  }
  return cell;
};

describe('OTPInput', () => {
  it('renders four digit inputs by default', () => {
    render(<OTPInput />);

    expect(screen.getAllByRole('textbox')).toHaveLength(4);
    expect(screen.getByRole('group', { name: 'Verification code' })).toBeInTheDocument();
  });

  it('renders six digits with a separator', () => {
    render(<OTPInput length={6} separator />);

    expect(screen.getAllByRole('textbox')).toHaveLength(6);
    expect(screen.getByText('-')).toBeInTheDocument();
  });

  it('forwards ref to the root group element', () => {
    const ref = createRef<HTMLDivElement>();
    render(<OTPInput ref={ref} />);
    expect(ref.current).toHaveAttribute('role', 'group');
  });

  it('moves focus to the next cell when typing', async () => {
    const user = userEvent.setup();
    render(<OTPInput />);

    const cells = getOtpCells();
    const firstCell = requireCell(cells, 0);
    const secondCell = requireCell(cells, 1);

    await user.click(firstCell);
    await user.keyboard('1');

    expect(firstCell).toHaveValue('1');
    expect(secondCell).toHaveFocus();
  });

  it('supports pasting a full code', () => {
    render(<OTPInput length={4} />);

    const cells = getOtpCells();
    const firstCell = requireCell(cells, 0);
    const lastCell = requireCell(cells, 3);

    fireEvent.paste(firstCell, {
      clipboardData: {
        getData: () => '1234',
      },
    });

    expect(firstCell).toHaveValue('1');
    expect(lastCell).toHaveValue('4');
  });

  it('calls onChange and onComplete in controlled mode', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const onComplete = vi.fn();

    const ControlledOTP = () => {
      const [value, setValue] = useState('');

      return (
        <OTPInput
          length={4}
          value={value}
          onChange={(nextValue) => {
            setValue(nextValue);
            onChange(nextValue);
          }}
          onComplete={onComplete}
        />
      );
    };

    render(<ControlledOTP />);

    const firstCell = requireCell(getOtpCells(), 0);
    await user.click(firstCell);
    await user.keyboard('1234');

    expect(onChange).toHaveBeenLastCalledWith('1234');
    expect(onComplete).toHaveBeenCalledWith('1234');
  });

  it('marks cells invalid when invalid is true', () => {
    render(<OTPInput invalid />);
    const firstCell = requireCell(getOtpCells(), 0);
    expect(firstCell).toHaveAttribute('aria-invalid', 'true');
  });
});
