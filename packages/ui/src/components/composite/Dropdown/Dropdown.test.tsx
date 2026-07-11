import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Button } from '../../base/Button';
import { Dropdown, DropdownItem } from './Dropdown';

describe('Dropdown', () => {
  it('opens and closes the menu from the trigger', async () => {
    const user = userEvent.setup();

    render(
      <Dropdown trigger={<Button>Open menu</Button>}>
        <DropdownItem>Profile</DropdownItem>
        <DropdownItem>Settings</DropdownItem>
      </Dropdown>,
    );

    const trigger = screen.getByRole('button', { name: 'Open menu' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();

    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('menu')).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'Profile' })).toBeInTheDocument();

    await user.click(screen.getByRole('menuitem', { name: 'Profile' }));
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('closes on Escape', async () => {
    const user = userEvent.setup();

    render(
      <Dropdown trigger={<Button>Open menu</Button>}>
        <DropdownItem>Profile</DropdownItem>
      </Dropdown>,
    );

    await user.click(screen.getByRole('button', { name: 'Open menu' }));
    expect(screen.getByRole('menu')).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('does not open when disabled', async () => {
    const user = userEvent.setup();

    render(
      <Dropdown disabled trigger={<Button>Open menu</Button>}>
        <DropdownItem>Profile</DropdownItem>
      </Dropdown>,
    );

    await user.click(screen.getByRole('button', { name: 'Open menu' }));
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('supports controlled open state', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();

    const { rerender } = render(
      <Dropdown open={false} onOpenChange={onOpenChange} trigger={<Button>Open menu</Button>}>
        <DropdownItem>Profile</DropdownItem>
      </Dropdown>,
    );

    expect(screen.queryByRole('menu')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Open menu' }));
    expect(onOpenChange).toHaveBeenCalledWith(true);

    rerender(
      <Dropdown open onOpenChange={onOpenChange} trigger={<Button>Open menu</Button>}>
        <DropdownItem>Profile</DropdownItem>
      </Dropdown>,
    );

    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  it('forwards ref to the root element', () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <Dropdown ref={ref} trigger={<Button>Open menu</Button>}>
        <DropdownItem>Profile</DropdownItem>
      </Dropdown>,
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('supports arrow key navigation between menu items', async () => {
    const user = userEvent.setup();

    render(
      <Dropdown trigger={<Button>Open menu</Button>}>
        <DropdownItem>Profile</DropdownItem>
        <DropdownItem>Settings</DropdownItem>
        <DropdownItem>Sign out</DropdownItem>
      </Dropdown>,
    );

    await user.click(screen.getByRole('button', { name: 'Open menu' }));

    const profile = screen.getByRole('menuitem', { name: 'Profile' });
    const settings = screen.getByRole('menuitem', { name: 'Settings' });
    const signOut = screen.getByRole('menuitem', { name: 'Sign out' });

    expect(profile).toHaveFocus();

    await user.keyboard('{ArrowDown}');
    expect(settings).toHaveFocus();

    await user.keyboard('{ArrowDown}');
    expect(signOut).toHaveFocus();

    await user.keyboard('{ArrowUp}');
    expect(settings).toHaveFocus();

    await user.keyboard('{Home}');
    expect(profile).toHaveFocus();

    await user.keyboard('{End}');
    expect(signOut).toHaveFocus();
  });

  it('supports arrow key navigation in rtl layouts', async () => {
    const user = userEvent.setup();

    render(
      <div dir="rtl" lang="fa">
        <Dropdown trigger={<Button>باز کردن منو</Button>}>
          <DropdownItem>پروفایل</DropdownItem>
          <DropdownItem>تنظیمات</DropdownItem>
        </Dropdown>
      </div>,
    );

    await user.click(screen.getByRole('button', { name: 'باز کردن منو' }));

    const profile = screen.getByRole('menuitem', { name: 'پروفایل' });
    const settings = screen.getByRole('menuitem', { name: 'تنظیمات' });

    expect(profile).toHaveFocus();

    await user.keyboard('{ArrowDown}');
    expect(settings).toHaveFocus();

    await user.keyboard('{ArrowUp}');
    expect(profile).toHaveFocus();
  });
});
