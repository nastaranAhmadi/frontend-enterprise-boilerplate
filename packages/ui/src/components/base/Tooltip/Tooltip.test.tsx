import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach,beforeEach, describe, expect, it, vi } from 'vitest';

import { Button } from '../Button';
import { Tooltip } from './Tooltip';

const mockRect = (rect: Partial<DOMRect>): DOMRect => ({
  x: rect.left ?? 0,
  y: rect.top ?? 0,
  width: rect.width ?? 0,
  height: rect.height ?? 0,
  top: rect.top ?? 0,
  left: rect.left ?? 0,
  right: rect.right ?? 0,
  bottom: rect.bottom ?? 0,
  toJSON: () => ({}),
});

describe('Tooltip', () => {
  beforeEach(() => {
    vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function mock(
      this: Element,
    ) {
      if (this.getAttribute('role') === 'tooltip') {
        return mockRect({ top: 0, left: 0, width: 80, height: 32, right: 80, bottom: 32 });
      }

      return mockRect({ top: 100, left: 100, width: 40, height: 20, right: 140, bottom: 120 });
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('shows tooltip on hover', async () => {
    render(
      <Tooltip title="Delete" enterDelay={0}>
        <Button>Action</Button>
      </Tooltip>,
    );

    fireEvent.mouseEnter(screen.getByRole('button', { name: 'Action' }));

    await waitFor(() => {
      expect(screen.getByRole('tooltip', { name: 'Delete' })).toBeInTheDocument();
    });
  });

  it('uses aria-labelledby by default when open', async () => {
    render(
      <Tooltip title="Delete" enterDelay={0}>
        <Button>Action</Button>
      </Tooltip>,
    );

    const button = screen.getByRole('button', { name: 'Action' });
    fireEvent.mouseEnter(button);

    const tooltip = await screen.findByRole('tooltip', { name: 'Delete' });
    expect(button).toHaveAttribute('aria-labelledby', tooltip.id);
  });

  it('uses aria-describedby when describeChild is enabled', async () => {
    render(
      <Tooltip describeChild title="More info" enterDelay={0}>
        <Button>Add</Button>
      </Tooltip>,
    );

    const button = screen.getByRole('button', { name: 'Add' });
    fireEvent.mouseEnter(button);

    const tooltip = await screen.findByRole('tooltip', { name: 'More info' });
    expect(button).toHaveAttribute('aria-describedby', tooltip.id);
  });

  it('supports controlled open state', () => {
    const onOpen = vi.fn();
    const onClose = vi.fn();

    const { rerender } = render(
      <Tooltip title="Add" open={false} onOpen={onOpen} onClose={onClose}>
        <Button>Controlled</Button>
      </Tooltip>,
    );

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

    rerender(
      <Tooltip title="Add" open onOpen={onOpen} onClose={onClose}>
        <Button>Controlled</Button>
      </Tooltip>,
    );

    expect(screen.getByRole('tooltip', { name: 'Add' })).toBeInTheDocument();
  });

  it('wraps disabled children so hover can still show the tooltip', async () => {
    render(
      <Tooltip describeChild title="You do not have permission" enterDelay={0}>
        <Button disabled>A Disabled Button</Button>
      </Tooltip>,
    );

    const wrapper = screen.getByRole('button', { name: 'A Disabled Button' }).parentElement;
    expect(wrapper).toBeTruthy();
    fireEvent.mouseEnter(wrapper as Element);

    expect(
      await screen.findByRole('tooltip', { name: 'You do not have permission' }),
    ).toBeInTheDocument();
  });

  it('renders arrow when requested', async () => {
    render(
      <Tooltip arrow title="Add" enterDelay={0}>
        <Button>Arrow</Button>
      </Tooltip>,
    );

    fireEvent.mouseEnter(screen.getByRole('button', { name: 'Arrow' }));

    const tooltip = await screen.findByRole('tooltip', { name: 'Add' });
    expect(tooltip.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
  });

  it('hides tooltip on mouse leave', async () => {
    render(
      <Tooltip title="Delete" enterDelay={0} leaveDelay={0}>
        <Button>Action</Button>
      </Tooltip>,
    );

    const button = screen.getByRole('button', { name: 'Action' });
    fireEvent.mouseEnter(button);
    await screen.findByRole('tooltip', { name: 'Delete' });

    fireEvent.mouseLeave(button);

    await waitFor(() => {
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });
  });
});
