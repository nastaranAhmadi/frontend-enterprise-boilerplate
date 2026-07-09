import type { ComponentProps, ReactElement } from 'react';

import { Radio } from './Radio';

const meta = {
  title: 'Base/Radio',
  component: Radio,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'Base radio primitive. Use inside RadioGroup for grouped options with shared name and validation.',
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
    label: { control: 'text' },
  },
  args: {
    label: 'Free plan',
    name: 'plan',
    value: 'free',
    size: 'medium',
    invalid: false,
    disabled: false,
  },
};

export default meta;

type RadioStory = {
  args?: Partial<ComponentProps<typeof Radio>>;
  render?: (args: ComponentProps<typeof Radio>) => ReactElement;
};

export const Playground: RadioStory = {};

export const WithoutLabel: RadioStory = {
  args: {
    label: undefined,
    'aria-label': 'Free plan',
  },
};

export const Sizes: RadioStory = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Radio {...args} size="small" label="Small" value="small" />
      <Radio {...args} size="medium" label="Medium" value="medium" />
      <Radio {...args} size="large" label="Large" value="large" />
    </div>
  ),
};

export const Invalid: RadioStory = {
  args: {
    invalid: true,
    label: 'Invalid option',
  },
};

export const Disabled: RadioStory = {
  args: {
    disabled: true,
    defaultChecked: true,
    label: 'Disabled option',
  },
};
