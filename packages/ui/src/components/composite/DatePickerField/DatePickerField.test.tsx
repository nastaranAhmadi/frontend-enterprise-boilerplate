import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { DatePickerField } from './DatePickerField';

describe('DatePickerField', () => {
  it('wires label, helper text, and error messaging', () => {
    render(
      <DatePickerField
        id="birth-date"
        label="Birth date"
        helperText="Use your official birth date."
        error="Date is required."
        defaultValue="2026-07-13"
      />,
    );

    const control = screen.getByLabelText('Birth date');
    expect(control).toHaveAttribute('id', 'birth-date');
    expect(control).toHaveAttribute('aria-describedby', 'birth-date-helper birth-date-error');
    expect(screen.getByText('Use your official birth date.')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent('Date is required.');
  });
});
