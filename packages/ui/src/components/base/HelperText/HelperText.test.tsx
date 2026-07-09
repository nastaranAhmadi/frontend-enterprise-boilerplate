import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';

import { HelperText } from './HelperText';

describe('HelperText', () => {
  it('renders helper text', () => {
    render(<HelperText>We will never share your email.</HelperText>);
    expect(screen.getByText('We will never share your email.')).toBeInTheDocument();
  });

  it('forwards ref to the native paragraph element', () => {
    const ref = createRef<HTMLParagraphElement>();
    render(<HelperText ref={ref}>Helper</HelperText>);
    expect(ref.current).toBeInstanceOf(HTMLParagraphElement);
  });

  it('renders nothing when children are empty', () => {
    const { container } = render(<HelperText>{''}</HelperText>);
    expect(container).toBeEmptyDOMElement();
  });

  it('passes through id for aria-describedby wiring', () => {
    render(<HelperText id="email-help">Password must be at least 8 characters.</HelperText>);
    expect(screen.getByText('Password must be at least 8 characters.')).toHaveAttribute(
      'id',
      'email-help',
    );
  });

  it('supports aria-describedby association with a control', () => {
    render(
      <>
        <input aria-describedby="email-help" aria-label="Email" />
        <HelperText id="email-help">We will never share your email.</HelperText>
      </>,
    );

    expect(screen.getByLabelText('Email')).toHaveAttribute('aria-describedby', 'email-help');
    expect(screen.getByText('We will never share your email.')).toHaveAttribute('id', 'email-help');
  });

  it('applies disabled styling as a visual state', () => {
    render(<HelperText disabled>Helper</HelperText>);
    expect(screen.getByText('Helper')).toHaveClass('opacity-50');
  });

  it('applies className', () => {
    render(<HelperText className="custom-helper">Helper</HelperText>);
    expect(screen.getByText('Helper')).toHaveClass('custom-helper');
  });
});
