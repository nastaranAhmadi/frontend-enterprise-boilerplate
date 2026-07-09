import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Radio } from './Radio';

describe('Radio', () => {
  it('renders a native radio input', () => {
    render(<Radio aria-label="Free plan" name="plan" value="free" />);
    expect(screen.getByRole('radio', { name: 'Free plan' })).toBeInTheDocument();
  });

  it('renders an inline label', () => {
    render(<Radio label="Free plan" name="plan" value="free" />);
    expect(screen.getByLabelText('Free plan')).toBeInTheDocument();
  });

  it('forwards ref to the native radio element', () => {
    const ref = createRef<HTMLInputElement>();
    render(<Radio ref={ref} aria-label="Free plan" name="plan" value="free" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current).toHaveAttribute('type', 'radio');
  });

  it('calls onChange when enabled', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<Radio aria-label="Free plan" name="plan" value="free" onChange={onChange} />);
    await user.click(screen.getByRole('radio', { name: 'Free plan' }));

    expect(onChange).toHaveBeenCalled();
  });

  it('does not call onChange when disabled', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<Radio aria-label="Free plan" name="plan" value="free" disabled onChange={onChange} />);
    await user.click(screen.getByRole('radio', { name: 'Free plan' }));

    expect(onChange).not.toHaveBeenCalled();
  });

  it('applies invalid styles only when invalid', () => {
    const { rerender } = render(
      <Radio aria-label="Free plan" name="plan" value="free" invalid={false} />,
    );
    expect(screen.getByRole('radio', { name: 'Free plan' })).not.toHaveClass('border-error');

    rerender(<Radio aria-label="Free plan" name="plan" value="free" invalid />);
    expect(screen.getByRole('radio', { name: 'Free plan' })).toHaveClass('border-error');
  });

  it('applies className to the root wrapper', () => {
    const { container } = render(
      <Radio aria-label="Free plan" name="plan" value="free" className="custom-root" />,
    );
    expect(container.firstChild).toHaveClass('custom-root');
  });
});
