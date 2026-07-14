import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Alert } from './Alert';

describe('Alert', () => {
  it('renders title and description', () => {
    render(
      <Alert title="Saved" variant="success">
        Your changes were applied.
      </Alert>,
    );

    expect(screen.getByText('Saved')).toBeInTheDocument();
    expect(screen.getByText('Your changes were applied.')).toBeInTheDocument();
  });

  it('uses alert role for error and warning variants', () => {
    const { rerender } = render(<Alert variant="error">Something went wrong</Alert>);
    expect(screen.getByRole('alert')).toHaveTextContent('Something went wrong');

    rerender(<Alert variant="warning">Check this value</Alert>);
    expect(screen.getByRole('alert')).toHaveTextContent('Check this value');
  });

  it('uses status role for informational variants', () => {
    render(<Alert variant="info">Heads up</Alert>);
    expect(screen.getByRole('status')).toHaveTextContent('Heads up');
  });

  it('calls onClose when dismissed', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <Alert title="Notice" onClose={onClose}>
        Dismissible message
      </Alert>,
    );

    await user.click(screen.getByRole('button', { name: 'Dismiss' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('hides the icon when icon is false', () => {
    const { container } = render(
      <Alert icon={false} variant="success">
        No icon
      </Alert>,
    );

    expect(container.querySelector('svg')).toBeNull();
  });

  it('forwards ref to the root element', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Alert ref={ref}>Ref target</Alert>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
