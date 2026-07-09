import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('renders a native checkbox', () => {
    render(<Checkbox aria-label="Accept terms" />);
    expect(screen.getByRole('checkbox', { name: 'Accept terms' })).toBeInTheDocument();
  });

  it('forwards ref to the native checkbox element', () => {
    const ref = createRef<HTMLInputElement>();
    render(<Checkbox ref={ref} aria-label="Accept terms" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current).toHaveAttribute('type', 'checkbox');
  });

  it('calls onChange when enabled', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<Checkbox aria-label="Accept terms" onChange={onChange} />);
    await user.click(screen.getByRole('checkbox', { name: 'Accept terms' }));

    expect(onChange).toHaveBeenCalled();
  });

  it('does not call onChange when disabled', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<Checkbox aria-label="Accept terms" disabled onChange={onChange} />);
    await user.click(screen.getByRole('checkbox', { name: 'Accept terms' }));

    expect(onChange).not.toHaveBeenCalled();
  });

  it('exposes aria-invalid only when invalid', () => {
    const { rerender } = render(<Checkbox aria-label="Accept terms" invalid={false} />);
    expect(screen.getByRole('checkbox', { name: 'Accept terms' })).not.toHaveAttribute(
      'aria-invalid',
    );

    rerender(<Checkbox aria-label="Accept terms" invalid />);
    expect(screen.getByRole('checkbox', { name: 'Accept terms' })).toHaveAttribute(
      'aria-invalid',
      'true',
    );
  });

  it('applies className to the root wrapper', () => {
    const { container } = render(<Checkbox aria-label="Accept terms" className="custom-root" />);
    expect(container.firstChild).toHaveClass('custom-root');
  });

  it('passes through native checkbox attributes', () => {
    render(<Checkbox aria-label="Accept terms" name="terms" value="yes" defaultChecked />);
    const checkbox = screen.getByRole('checkbox', { name: 'Accept terms' });

    expect(checkbox).toHaveAttribute('name', 'terms');
    expect(checkbox).toHaveAttribute('value', 'yes');
    expect(checkbox).toBeChecked();
  });
});
