import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { OTPInputField } from './OTPInputField';

describe('OTPInputField', () => {
  it('wires label and helper text to the otp input group', () => {
    render(
      <OTPInputField
        id="secure-code"
        label="Secure code"
        helperText="This is a hint text to help user."
        length={4}
      />,
    );

    expect(screen.getByText('Secure code')).toBeInTheDocument();
    expect(screen.getByText('This is a hint text to help user.')).toHaveAttribute(
      'id',
      'secure-code-helper',
    );
    expect(screen.getByRole('group', { name: 'Verification code' })).toHaveAttribute(
      'aria-describedby',
      'secure-code-helper',
    );
    expect(screen.getByLabelText('Secure code')).toHaveAttribute('id', 'secure-code');
  });
});
