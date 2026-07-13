import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { SpeedDial, SpeedDialAction } from './index';

describe('SpeedDial', () => {
  it('opens and closes from the trigger', async () => {
    const user = userEvent.setup();

    render(
      <SpeedDial aria-label="Create">
        <SpeedDial.Action icon={<span>C</span>} tooltip="Copy" />
        <SpeedDial.Action icon={<span>S</span>} tooltip="Save" />
      </SpeedDial>,
    );

    const trigger = screen.getByRole('button', { name: 'Create' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();

    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('menu')).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'Copy' })).toBeInTheDocument();

    await user.click(trigger);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('closes when an action is selected', async () => {
    const user = userEvent.setup();
    const onCopy = vi.fn();

    render(
      <SpeedDial aria-label="Create">
        <SpeedDial.Action icon={<span>C</span>} tooltip="Copy" onClick={onCopy} />
      </SpeedDial>,
    );

    await user.click(screen.getByRole('button', { name: 'Create' }));
    await user.click(screen.getByRole('menuitem', { name: 'Copy' }));

    expect(onCopy).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('closes on Escape', async () => {
    const user = userEvent.setup();

    render(
      <SpeedDial aria-label="Create">
        <SpeedDial.Action icon={<span>C</span>} tooltip="Copy" />
      </SpeedDial>,
    );

    await user.click(screen.getByRole('button', { name: 'Create' }));
    expect(screen.getByRole('menu')).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('supports controlled open state', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();

    const { rerender } = render(
      <SpeedDial aria-label="Create" open={false} onOpenChange={onOpenChange}>
        <SpeedDial.Action icon={<span>C</span>} tooltip="Copy" />
      </SpeedDial>,
    );

    await user.click(screen.getByRole('button', { name: 'Create' }));
    expect(onOpenChange).toHaveBeenCalledWith(true);

    rerender(
      <SpeedDial aria-label="Create" open onOpenChange={onOpenChange}>
        <SpeedDial.Action icon={<span>C</span>} tooltip="Copy" />
      </SpeedDial>,
    );

    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  it('does not open when disabled', async () => {
    const user = userEvent.setup();

    render(
      <SpeedDial aria-label="Create" disabled>
        <SpeedDial.Action icon={<span>C</span>} tooltip="Copy" />
      </SpeedDial>,
    );

    await user.click(screen.getByRole('button', { name: 'Create' }));
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('supports arrow key navigation for vertical menus', async () => {
    const user = userEvent.setup();

    render(
      <SpeedDial aria-label="Create" direction="up">
        <SpeedDial.Action icon={<span>C</span>} tooltip="Copy" />
        <SpeedDial.Action icon={<span>S</span>} tooltip="Save" />
        <SpeedDial.Action icon={<span>P</span>} tooltip="Print" />
      </SpeedDial>,
    );

    await user.click(screen.getByRole('button', { name: 'Create' }));

    const copy = screen.getByRole('menuitem', { name: 'Copy' });
    const save = screen.getByRole('menuitem', { name: 'Save' });
    const print = screen.getByRole('menuitem', { name: 'Print' });

    expect(copy).toHaveFocus();

    await user.keyboard('{ArrowDown}');
    expect(save).toHaveFocus();

    await user.keyboard('{ArrowDown}');
    expect(print).toHaveFocus();

    await user.keyboard('{ArrowUp}');
    expect(save).toHaveFocus();
  });

  it('forwards ref to the root element', () => {
    const ref = createRef<HTMLDivElement>();

    render(
      <SpeedDial ref={ref} aria-label="Create">
        <SpeedDialAction icon={<span>C</span>} tooltip="Copy" />
      </SpeedDial>,
    );

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('shows persistent tooltips when tooltipOpen is enabled', async () => {
    const user = userEvent.setup();

    render(
      <SpeedDial aria-label="Create" tooltipOpen>
        <SpeedDial.Action icon={<span>C</span>} tooltip="Copy" />
      </SpeedDial>,
    );

    await user.click(screen.getByRole('button', { name: 'Create' }));
    expect(screen.getByRole('tooltip', { name: 'Copy' })).toBeInTheDocument();
  });
});
