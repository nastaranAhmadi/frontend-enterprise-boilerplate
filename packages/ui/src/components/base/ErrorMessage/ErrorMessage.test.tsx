import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';

import { ErrorMessage } from './ErrorMessage';

describe('ErrorMessage', () => {
  it('renders error text', () => {
    render(<ErrorMessage>Email is required.</ErrorMessage>);
    expect(screen.getByRole('alert')).toHaveTextContent('Email is required.');
  });

  it('forwards ref to the native paragraph element', () => {
    const ref = createRef<HTMLParagraphElement>();
    render(<ErrorMessage ref={ref}>Error</ErrorMessage>);
    expect(ref.current).toBeInstanceOf(HTMLParagraphElement);
  });

  it('renders nothing when children are empty', () => {
    const { container } = render(<ErrorMessage>{''}</ErrorMessage>);
    expect(container).toBeEmptyDOMElement();
  });

  it('defaults role to alert', () => {
    render(<ErrorMessage>Error</ErrorMessage>);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('passes through id for aria-describedby wiring', () => {
    render(<ErrorMessage id="email-error">Email is required.</ErrorMessage>);
    expect(screen.getByRole('alert')).toHaveAttribute('id', 'email-error');
  });

  it('supports aria-describedby association with a control', () => {
    render(
      <>
        <input aria-describedby="email-error" aria-invalid="true" aria-label="Email" />
        <ErrorMessage id="email-error">Email is required.</ErrorMessage>
      </>,
    );

    expect(screen.getByLabelText('Email')).toHaveAttribute('aria-describedby', 'email-error');
    expect(screen.getByRole('alert')).toHaveAttribute('id', 'email-error');
  });

  it('allows role override', () => {
    render(<ErrorMessage role="status">Error</ErrorMessage>);
    expect(screen.getByRole('status')).toHaveTextContent('Error');
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('applies className', () => {
    render(<ErrorMessage className="custom-error">Error</ErrorMessage>);
    expect(screen.getByRole('alert')).toHaveClass('custom-error');
  });
});
