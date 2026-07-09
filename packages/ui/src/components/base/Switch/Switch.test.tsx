import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Switch } from './Switch';

describe('Switch', () => {
  it('renders a switch', () => {
    render(<Switch aria-label="Enable notifications" />);
    expect(screen.getByRole('switch', { name: 'Enable notifications' })).toBeInTheDocument();
  });

  it('forwards ref to the native input element', () => {
    const ref = createRef<HTMLInputElement>();
    render(<Switch ref={ref} aria-label="Enable notifications" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current).toHaveAttribute('role', 'switch');
  });

  it('toggles on click', async () => {
    const user = userEvent.setup();

    render(<Switch aria-label="Enable notifications" />);
    const switchControl = screen.getByRole('switch', { name: 'Enable notifications' });

    expect(switchControl).not.toBeChecked();
    await user.click(switchControl);
    expect(switchControl).toBeChecked();
  });

  it('calls onChange when enabled', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<Switch aria-label="Enable notifications" onChange={onChange} />);
    await user.click(screen.getByRole('switch', { name: 'Enable notifications' }));

    expect(onChange).toHaveBeenCalled();
  });

  it('does not call onChange when disabled', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<Switch aria-label="Enable notifications" disabled onChange={onChange} />);
    await user.click(screen.getByRole('switch', { name: 'Enable notifications' }));

    expect(onChange).not.toHaveBeenCalled();
  });

  it('exposes aria-invalid only when invalid', () => {
    const { rerender } = render(<Switch aria-label="Enable notifications" invalid={false} />);
    expect(screen.getByRole('switch', { name: 'Enable notifications' })).not.toHaveAttribute(
      'aria-invalid',
    );

    rerender(<Switch aria-label="Enable notifications" invalid />);
    expect(screen.getByRole('switch', { name: 'Enable notifications' })).toHaveAttribute(
      'aria-invalid',
      'true',
    );
  });

  it('applies className to the root wrapper', () => {
    const { container } = render(
      <Switch aria-label="Enable notifications" className="custom-root" />,
    );
    expect(container.firstChild).toHaveClass('custom-root');
  });

  it('passes through native attributes', () => {
    render(<Switch aria-label="Enable notifications" name="notifications" defaultChecked />);
    const switchControl = screen.getByRole('switch', { name: 'Enable notifications' });

    expect(switchControl).toHaveAttribute('name', 'notifications');
    expect(switchControl).toBeChecked();
  });
});
