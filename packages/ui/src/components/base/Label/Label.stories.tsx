import type { ComponentProps, ReactElement } from 'react';

import { Label } from './Label';

const meta = {
  title: 'Base/Label',
  component: Label,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
    docs: {
      description: {
        component: 'Accessible label primitive for form controls.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
    className: { control: false },
  },
  args: {
    children: 'Email address',
    htmlFor: 'email',
    size: 'medium',
    required: false,
    disabled: false,
  },
};

export default meta;

type LabelStory = {
  args?: Partial<ComponentProps<typeof Label>>;
  render?: (args: ComponentProps<typeof Label>) => ReactElement;
};

export const Playground: LabelStory = {};

export const Required: LabelStory = {
  args: {
    required: true,
  },
};

export const Disabled: LabelStory = {
  args: {
    disabled: true,
  },
};

export const Sizes: LabelStory = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Label {...args} size="small">
        Small label
      </Label>
      <Label {...args} size="medium">
        Medium label
      </Label>
      <Label {...args} size="large">
        Large label
      </Label>
    </div>
  ),
  args: {},
};
