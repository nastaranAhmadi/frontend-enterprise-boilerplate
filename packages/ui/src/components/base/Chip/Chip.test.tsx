import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Chip } from './Chip';

const FaceIcon = () => <span data-testid="face-icon">☺</span>;

describe('Chip', () => {
  it('renders filled and outlined labels', () => {
    const { rerender } = render(<Chip>Chip Filled</Chip>);
    expect(screen.getByText('Chip Filled')).toBeInTheDocument();

    rerender(
      <Chip variant="outlined" color="primary">
        Chip Outlined
      </Chip>,
    );
    expect(screen.getByText('Chip Outlined').parentElement).toHaveClass('border-primary');
  });

  it('calls onClick when clickable', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <Chip onClick={onClick} variant="outlined">
        Clickable
      </Chip>,
    );

    await user.click(screen.getByRole('button', { name: 'Clickable' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('calls onDelete from the delete button', async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();

    render(<Chip onDelete={onDelete}>Deletable</Chip>);

    await user.click(screen.getByRole('button', { name: 'Remove' }));
    expect(onDelete).toHaveBeenCalledTimes(1);
  });

  it('calls onDelete when Backspace is pressed on a deletable chip', () => {
    const onDelete = vi.fn();

    render(<Chip onDelete={onDelete}>Deletable</Chip>);

    const chip = screen.getByText('Deletable').parentElement;
    expect(chip).toHaveAttribute('tabindex', '0');
    if (!(chip instanceof HTMLElement)) {
      throw new Error('Expected chip root element');
    }

    fireEvent.keyDown(chip, { key: 'Backspace' });
    expect(onDelete).toHaveBeenCalledTimes(1);
  });

  it('renders icon adornment', () => {
    render(
      <Chip icon={<FaceIcon />} variant="outlined">
        With Icon
      </Chip>,
    );

    expect(screen.getByTestId('face-icon')).toBeInTheDocument();
  });

  it('renders avatar adornment instead of icon', () => {
    render(
      <Chip avatar={<span data-testid="avatar">A</span>} icon={<FaceIcon />}>
        Avatar
      </Chip>,
    );

    expect(screen.getByTestId('avatar')).toBeInTheDocument();
    expect(screen.queryByTestId('face-icon')).not.toBeInTheDocument();
  });

  it('renders as a link when href is provided', () => {
    render(
      <Chip href="#chip" clickable>
        Clickable Link
      </Chip>,
    );

    expect(screen.getByRole('link', { name: 'Clickable Link' })).toHaveAttribute('href', '#chip');
  });

  it('applies semantic color classes', () => {
    render(
      <Chip color="success" variant="filled">
        success
      </Chip>,
    );

    expect(screen.getByText('success').parentElement).toHaveClass('bg-success');
  });

  it('supports small size', () => {
    render(<Chip size="small">Small</Chip>);
    expect(screen.getByText('Small').parentElement).toHaveClass('h-6');
  });

  it('forwards ref to the root element', () => {
    const ref = createRef<HTMLSpanElement>();
    render(
      <Chip ref={ref} color="primary">
        Ref
      </Chip>,
    );

    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });
});
