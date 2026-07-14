import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { DesignSystemProvider } from '../../../providers/DesignSystemProvider';
import { Tabs } from './index';

const renderBasicTabs = (props: Partial<React.ComponentProps<typeof Tabs>> = {}) =>
  render(
    <Tabs defaultSelectedKey="details" {...props}>
      <Tabs.List>
        <Tabs.Item id="details">My details</Tabs.Item>
        <Tabs.Item id="profile" badge={2}>
          Profile
        </Tabs.Item>
        <Tabs.Item id="team" disabled>
          Team
        </Tabs.Item>
      </Tabs.List>
      <Tabs.Panel id="details">Details content</Tabs.Panel>
      <Tabs.Panel id="profile">Profile content</Tabs.Panel>
      <Tabs.Panel id="team">Team content</Tabs.Panel>
    </Tabs>,
  );

describe('Tabs', () => {
  it('renders tab list and selected panel', () => {
    renderBasicTabs();

    expect(screen.getByRole('tablist')).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /my details/i })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Details content');
  });

  it('switches panels when a tab is clicked', async () => {
    const user = userEvent.setup();
    renderBasicTabs();

    await user.click(screen.getByRole('tab', { name: /profile/i }));

    expect(screen.getByRole('tab', { name: /profile/i })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Profile content');
  });

  it('calls onSelectionChange in controlled mode', async () => {
    const user = userEvent.setup();
    const onSelectionChange = vi.fn();

    const ControlledTabs = () => {
      const [selectedKey, setSelectedKey] = useState('details');

      return (
        <Tabs
          selectedKey={selectedKey}
          onSelectionChange={(key) => {
            setSelectedKey(key);
            onSelectionChange(key);
          }}
        >
          <Tabs.List>
            <Tabs.Item id="details">Details</Tabs.Item>
            <Tabs.Item id="profile">Profile</Tabs.Item>
          </Tabs.List>
          <Tabs.Panel id="details">Details panel</Tabs.Panel>
          <Tabs.Panel id="profile">Profile panel</Tabs.Panel>
        </Tabs>
      );
    };

    render(<ControlledTabs />);

    await user.click(screen.getByRole('tab', { name: /profile/i }));

    expect(onSelectionChange).toHaveBeenCalledWith('profile');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Profile panel');
  });

  it('renders badge content on tabs', () => {
    renderBasicTabs();

    expect(screen.getByRole('tab', { name: /profile/i })).toHaveTextContent('2');
  });

  it('does not select disabled tabs', async () => {
    const user = userEvent.setup();
    renderBasicTabs();

    await user.click(screen.getByRole('tab', { name: /team/i }));

    expect(screen.getByRole('tab', { name: /team/i })).toHaveAttribute('aria-selected', 'false');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Details content');
  });

  it('supports keyboard navigation between tabs', async () => {
    const user = userEvent.setup();
    renderBasicTabs();

    const detailsTab = screen.getByRole('tab', { name: /my details/i });
    detailsTab.focus();

    await user.keyboard('{ArrowRight}');

    expect(screen.getByRole('tab', { name: /profile/i })).toHaveFocus();
    expect(screen.getByRole('tab', { name: /profile/i })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Profile content');
  });

  it('throws when Tabs.Item is used outside Tabs.List', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined);

    expect(() =>
      render(
        <Tabs defaultSelectedKey="details">
          <Tabs.Item id="details">Details</Tabs.Item>
        </Tabs>,
      ),
    ).toThrow('Tabs.Item must be used within Tabs.List.');

    consoleError.mockRestore();
  });

  it('supports rtl keyboard navigation from DesignSystemProvider', async () => {
    const user = userEvent.setup();

    render(
      <DesignSystemProvider locale="fa-IR">
        <Tabs defaultSelectedKey="details">
          <Tabs.List>
            <Tabs.Item id="details">My details</Tabs.Item>
            <Tabs.Item id="profile">Profile</Tabs.Item>
          </Tabs.List>
          <Tabs.Panel id="details">Details content</Tabs.Panel>
          <Tabs.Panel id="profile">Profile content</Tabs.Panel>
        </Tabs>
      </DesignSystemProvider>,
    );

    const detailsTab = screen.getByRole('tab', { name: /my details/i });
    detailsTab.focus();

    await user.keyboard('{ArrowLeft}');

    expect(screen.getByRole('tab', { name: /profile/i })).toHaveFocus();
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Profile content');
  });
});
