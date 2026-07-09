import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Textarea } from './Textarea';

describe('Textarea', () => {
  it('renders a native textarea', () => {
    render(<Textarea aria-label="Bio" placeholder="Tell us about yourself" />);
    expect(screen.getByRole('textbox', { name: 'Bio' })).toBeInTheDocument();
  });

  it('forwards ref to the native textarea element', () => {
    const ref = createRef<HTMLTextAreaElement>();
    render(<Textarea ref={ref} aria-label="Bio" />);
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });

  it('calls onChange when enabled', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<Textarea aria-label="Bio" onChange={onChange} />);
    await user.type(screen.getByRole('textbox', { name: 'Bio' }), 'a');

    expect(onChange).toHaveBeenCalled();
  });

  it('does not call onChange when disabled', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<Textarea aria-label="Bio" disabled onChange={onChange} />);
    await user.type(screen.getByRole('textbox', { name: 'Bio' }), 'a');

    expect(onChange).not.toHaveBeenCalled();
  });

  it('exposes aria-invalid only when invalid', () => {
    const { rerender } = render(<Textarea aria-label="Bio" invalid={false} />);
    expect(screen.getByRole('textbox', { name: 'Bio' })).not.toHaveAttribute('aria-invalid');

    rerender(<Textarea aria-label="Bio" invalid />);
    expect(screen.getByRole('textbox', { name: 'Bio' })).toHaveAttribute('aria-invalid', 'true');
  });

  it('applies className to the root wrapper', () => {
    const { container } = render(<Textarea aria-label="Bio" className="custom-root" />);
    expect(container.firstChild).toHaveClass('custom-root');
  });

  it('passes through native textarea attributes', () => {
    render(<Textarea aria-label="Bio" name="bio" rows={4} placeholder="Bio" />);
    const textarea = screen.getByRole('textbox', { name: 'Bio' });

    expect(textarea).toHaveAttribute('name', 'bio');
    expect(textarea).toHaveAttribute('rows', '4');
    expect(textarea).toHaveAttribute('placeholder', 'Bio');
  });

  it('applies disabled styling to the native textarea element', () => {
    render(<Textarea aria-label="Bio" disabled />);
    expect(screen.getByRole('textbox', { name: 'Bio' })).toHaveClass('disabled:opacity-50');
  });

  it('keeps controlled props after native spread', () => {
    render(<Textarea aria-label="Bio" disabled={false} aria-invalid={false} />);

    const textarea = screen.getByRole('textbox', { name: 'Bio' });
    expect(textarea).not.toBeDisabled();
    expect(textarea).not.toHaveAttribute('aria-invalid');
  });
});
