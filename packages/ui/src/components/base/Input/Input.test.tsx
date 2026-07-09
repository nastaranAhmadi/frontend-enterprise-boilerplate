import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Input } from './Input';

describe('Input', () => {
  it('renders a native input', () => {
    render(<Input aria-label="Email" placeholder="Email" />);
    expect(screen.getByRole('textbox', { name: 'Email' })).toBeInTheDocument();
  });

  it('forwards ref to the native input element', () => {
    const ref = createRef<HTMLInputElement>();
    render(<Input ref={ref} aria-label="Email" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('calls onChange when enabled', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<Input aria-label="Email" onChange={onChange} />);
    await user.type(screen.getByRole('textbox', { name: 'Email' }), 'a');

    expect(onChange).toHaveBeenCalled();
  });

  it('does not call onChange when disabled', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<Input aria-label="Email" disabled onChange={onChange} />);
    await user.type(screen.getByRole('textbox', { name: 'Email' }), 'a');

    expect(onChange).not.toHaveBeenCalled();
  });

  it('exposes aria-invalid only when invalid', () => {
    const { rerender } = render(<Input aria-label="Email" invalid={false} />);
    expect(screen.getByRole('textbox', { name: 'Email' })).not.toHaveAttribute('aria-invalid');

    rerender(<Input aria-label="Email" invalid />);
    expect(screen.getByRole('textbox', { name: 'Email' })).toHaveAttribute('aria-invalid', 'true');
  });

  it('renders start and end adornments', () => {
    render(
      <Input
        aria-label="Search"
        startAdornment={<span data-testid="start-adornment" />}
        endAdornment={<span data-testid="end-adornment" />}
      />,
    );

    expect(screen.getByTestId('start-adornment')).toBeInTheDocument();
    expect(screen.getByTestId('end-adornment')).toBeInTheDocument();
  });

  it('applies className to the root wrapper', () => {
    const { container } = render(<Input aria-label="Email" className="custom-root" />);
    expect(container.firstChild).toHaveClass('custom-root');
  });

  it('passes through native input attributes', () => {
    render(<Input aria-label="Email" type="email" name="email" autoComplete="email" />);
    const input = screen.getByRole('textbox', { name: 'Email' });

    expect(input).toHaveAttribute('type', 'email');
    expect(input).toHaveAttribute('name', 'email');
    expect(input).toHaveAttribute('autocomplete', 'email');
  });
});
