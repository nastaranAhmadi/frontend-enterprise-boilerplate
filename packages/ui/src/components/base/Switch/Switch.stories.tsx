import type { ComponentProps, ReactElement } from 'react';

import { RtlDecorator } from '../../../storybook/decorators/RtlDecorator';
import { Label } from '../Label';
import { Switch } from './Switch';

const meta = {
  title: 'Base/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
    docs: {
      description: {
        component: 'Base switch primitive implemented with a checkbox input and role="switch".',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    invalid: { control: 'boolean' },
    disabled: { control: 'boolean' },
    className: { control: false },
  },
  args: {
    'aria-label': 'Enable notifications',
    size: 'medium',
    invalid: false,
    disabled: false,
  },
};

export default meta;

type SwitchStory = {
  args?: Partial<ComponentProps<typeof Switch>>;
  render?: (args: ComponentProps<typeof Switch>) => ReactElement;
  decorators?: Array<(Story: () => ReactElement) => ReactElement>;
};

export const Playground: SwitchStory = {};

export const WithLabel: SwitchStory = {
  render: (args) => (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      <Switch {...args} id="notifications" />
      <Label htmlFor="notifications">Enable notifications</Label>
    </div>
  ),
  args: {
    'aria-label': undefined,
  },
};

export const Checked: SwitchStory = {
  args: {
    defaultChecked: true,
  },
};

export const Sizes: SwitchStory = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Switch {...args} size="small" aria-label="Small switch" />
      <Switch {...args} size="medium" aria-label="Medium switch" />
      <Switch {...args} size="large" aria-label="Large switch" />
    </div>
  ),
};

export const Invalid: SwitchStory = {
  args: {
    invalid: true,
    'aria-label': 'Invalid switch',
  },
};

export const Disabled: SwitchStory = {
  args: {
    disabled: true,
    defaultChecked: true,
    'aria-label': 'Disabled switch',
  },
};

export const Rtl: SwitchStory = {
  decorators: [RtlDecorator],
  render: (args) => (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      <Switch {...args} id="notifications-rtl" defaultChecked />
      <Label htmlFor="notifications-rtl">دریافت اعلان‌ها</Label>
    </div>
  ),
  args: {
    'aria-label': undefined,
  },
};
