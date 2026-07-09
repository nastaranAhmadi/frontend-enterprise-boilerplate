import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';

import { Label } from './Label';

describe('Label', () => {
  it('renders a native label', () => {
    render(<Label htmlFor="email">Email</Label>);
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Email').tagName).toBe('LABEL');
  });

  it('associates with a control via htmlFor', () => {
    render(
      <>
        <Label htmlFor="email">Email</Label>
        <input id="email" />
      </>,
    );

    const label = screen.getByText('Email');
    expect(label).toHaveAttribute('for', 'email');
    expect(screen.getByLabelText('Email')).toBe(screen.getByRole('textbox'));
  });

  it('forwards ref to the native label element', () => {
    const ref = createRef<HTMLLabelElement>();
    render(<Label ref={ref}>Email</Label>);
    expect(ref.current).toBeInstanceOf(HTMLLabelElement);
  });

  it('renders a required indicator', () => {
    render(<Label required>Email</Label>);
    expect(screen.getByText('*')).toHaveAttribute('aria-hidden', 'true');
  });

  it('does not render a required indicator by default', () => {
    render(<Label>Email</Label>);
    expect(screen.queryByText('*')).not.toBeInTheDocument();
  });

  it('applies className', () => {
    render(<Label className="custom-label">Email</Label>);
    expect(screen.getByText('Email')).toHaveClass('custom-label');
  });
});
