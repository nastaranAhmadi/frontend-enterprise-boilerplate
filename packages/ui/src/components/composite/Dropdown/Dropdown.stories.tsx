import type { ComponentProps, ReactElement } from 'react';

import { Button } from '../../base/Button';
import { Dropdown, DropdownItem } from './Dropdown';

const meta = {
  title: 'Composite/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
    docs: {
      description: {
        component: 'Menu anchored to a trigger with keyboard dismissal and menu item actions.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    align: {
      control: 'select',
      options: ['start', 'end'],
    },
    disabled: { control: 'boolean' },
    className: { control: false },
    menuClassName: { control: false },
    trigger: { control: false },
    children: { control: false },
  },
  args: {
    size: 'medium',
    align: 'start',
    disabled: false,
  },
};

export default meta;

type DropdownStory = {
  args?: Partial<ComponentProps<typeof Dropdown>>;
  render?: (args: Partial<ComponentProps<typeof Dropdown>>) => ReactElement;
};

export const Playground: DropdownStory = {
  render: (args) => (
    <Dropdown {...args} trigger={<Button variant="outlined">Account</Button>}>
      <DropdownItem>Profile</DropdownItem>
      <DropdownItem>Settings</DropdownItem>
      <DropdownItem destructive>Sign out</DropdownItem>
    </Dropdown>
  ),
};

export const AlignEnd: DropdownStory = {
  args: { align: 'end' },
  render: (args) => (
    <Dropdown {...args} trigger={<Button variant="outlined">Actions</Button>}>
      <DropdownItem>Edit</DropdownItem>
      <DropdownItem>Duplicate</DropdownItem>
      <DropdownItem destructive>Delete</DropdownItem>
    </Dropdown>
  ),
};

export const Disabled: DropdownStory = {
  args: { disabled: true },
  render: (args) => (
    <Dropdown {...args} trigger={<Button variant="outlined">Disabled</Button>}>
      <DropdownItem>Hidden item</DropdownItem>
    </Dropdown>
  ),
};
