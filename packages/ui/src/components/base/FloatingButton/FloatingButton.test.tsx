import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { FloatingButton } from './FloatingButton';

const PlusIcon = () => (
  <span aria-hidden="true" data-testid="plus-icon">
    +
  </span>
);

describe('FloatingButton', () => {
  it('renders a circular icon button', () => {
    render(
      <FloatingButton aria-label="Add item">
        <PlusIcon />
      </FloatingButton>,
    );

    expect(screen.getByRole('button', { name: 'Add item' })).toBeInTheDocument();
    expect(screen.getByTestId('plus-icon')).toBeInTheDocument();
  });

  it('renders an extended button with icon and label', () => {
    render(
      <FloatingButton variant="extended" icon={<PlusIcon />}>
        Navigate
      </FloatingButton>,
    );

    expect(screen.getByRole('button', { name: 'Navigate' })).toBeInTheDocument();
    expect(screen.getByTestId('plus-icon')).toBeInTheDocument();
  });

  it('calls onClick when enabled', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <FloatingButton aria-label="Add" onClick={onClick}>
        <PlusIcon />
      </FloatingButton>,
    );

    await user.click(screen.getByRole('button', { name: 'Add' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <FloatingButton aria-label="Add" disabled onClick={onClick}>
        <PlusIcon />
      </FloatingButton>,
    );

    await user.click(screen.getByRole('button', { name: 'Add' }));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('shows busy state while loading', () => {
    render(
      <FloatingButton aria-label="Add" loading>
        <PlusIcon />
      </FloatingButton>,
    );

    const button = screen.getByRole('button', { name: 'Add' });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(screen.queryByTestId('plus-icon')).not.toBeInTheDocument();
  });

  it('applies size and color classes', () => {
    render(
      <FloatingButton aria-label="Add" color="secondary" size="small">
        <PlusIcon />
      </FloatingButton>,
    );

    const button = screen.getByRole('button', { name: 'Add' });
    expect(button).toHaveClass('h-10', 'w-10', 'bg-secondary');
  });

  it('forwards ref to the native button element', () => {
    const ref = createRef<HTMLButtonElement>();
    render(
      <FloatingButton ref={ref} aria-label="Add">
        <PlusIcon />
      </FloatingButton>,
    );

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});
