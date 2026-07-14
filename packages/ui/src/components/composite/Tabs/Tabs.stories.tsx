import type { ComponentProps, ReactElement } from 'react';
import { useState } from 'react';

import { Tabs } from './index';

const TAB_ITEMS = [
  { id: 'details', label: 'My details' },
  { id: 'profile', label: 'Profile', badge: 2 },
  { id: 'password', label: 'Password' },
  { id: 'team', label: 'Team' },
  { id: 'notifications', label: 'Notifications', badge: 2 },
  { id: 'integrations', label: 'Integrations' },
  { id: 'api', label: 'API' },
] as const;

const meta = {
  title: 'Composite/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'Accessible tab navigation with Untitled UI-inspired variants. Use `Tabs.List`, `Tabs.Item`, and `Tabs.Panel` with matching `id` values. Supports badges, sizes, full-width layout, and horizontal or vertical orientation.',
      },
    },
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    className: { control: false },
    children: { control: false },
    selectedKey: { control: false },
    defaultSelectedKey: { control: false },
    onSelectionChange: { control: false },
  },
  args: {
    orientation: 'horizontal',
    defaultSelectedKey: 'details',
  },
};

export default meta;

type StoryProps = ComponentProps<typeof Tabs> & {
  fullWidth?: boolean;
  size?: 'small' | 'medium';
  variant?:
    | 'button-brand'
    | 'button-gray'
    | 'button-border'
    | 'button-minimal'
    | 'underline'
    | 'line';
};

const TabsExample = ({
  variant = 'underline',
  size = 'small',
  fullWidth = false,
  orientation = 'horizontal',
  ...tabsProps
}: StoryProps): ReactElement => {
  const [selectedKey, setSelectedKey] = useState(tabsProps.defaultSelectedKey ?? 'details');

  return (
    <Tabs
      {...tabsProps}
      orientation={orientation}
      selectedKey={selectedKey}
      onSelectionChange={setSelectedKey}
      className="max-w-3xl"
    >
      <Tabs.List variant={variant} size={size} fullWidth={fullWidth}>
        {TAB_ITEMS.map((item) => (
          <Tabs.Item key={item.id} id={item.id} badge={'badge' in item ? item.badge : undefined}>
            {item.label}
          </Tabs.Item>
        ))}
      </Tabs.List>
      {TAB_ITEMS.map((item) => (
        <Tabs.Panel key={item.id} id={item.id}>
          <div className="rounded-lg border border-border bg-background p-lg">
            <h3 className="text-lg font-semibold text-foreground">{item.label}</h3>
            <p className="mt-sm text-sm text-muted">
              Content for the {item.label.toLowerCase()} tab.
            </p>
          </div>
        </Tabs.Panel>
      ))}
    </Tabs>
  );
};

export const Underline = {
  render: (args: StoryProps) => <TabsExample {...args} variant="underline" />,
};

export const Line = {
  render: (args: StoryProps) => <TabsExample {...args} variant="line" />,
};

export const ButtonBrand = {
  render: (args: StoryProps) => <TabsExample {...args} variant="button-brand" />,
};

export const ButtonGray = {
  render: (args: StoryProps) => <TabsExample {...args} variant="button-gray" />,
};

export const ButtonBorder = {
  render: (args: StoryProps) => <TabsExample {...args} variant="button-border" />,
};

export const ButtonMinimal = {
  render: (args: StoryProps) => <TabsExample {...args} variant="button-minimal" />,
};

export const MediumSize = {
  render: (args: StoryProps) => <TabsExample {...args} variant="underline" size="medium" />,
};

export const FullWidth = {
  render: (args: StoryProps) => (
    <TabsExample {...args} variant="button-brand" fullWidth size="medium" />
  ),
};

export const VerticalUnderline = {
  render: (args: StoryProps) => (
    <TabsExample {...args} variant="underline" orientation="vertical" />
  ),
};

export const VerticalButtonBrand = {
  render: (args: StoryProps) => (
    <TabsExample {...args} variant="button-brand" orientation="vertical" />
  ),
};
