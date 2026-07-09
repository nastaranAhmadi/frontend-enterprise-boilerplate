import type { ComponentProps, ReactElement } from 'react';

import { Checkbox } from './Checkbox';

const meta = {
  title: 'Base/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'Base checkbox primitive. Pair with Label or use CheckboxField for labelled fields.',
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
    'aria-label': 'Accept terms',
    size: 'medium',
    invalid: false,
    disabled: false,
  },
};

export default meta;

type CheckboxStory = {
  args?: Partial<ComponentProps<typeof Checkbox>>;
  render?: (args: ComponentProps<typeof Checkbox>) => ReactElement;
};

export const Playground: CheckboxStory = {};

export const Checked: CheckboxStory = {
  args: {
    defaultChecked: true,
  },
};

export const Sizes: CheckboxStory = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Checkbox {...args} size="small" aria-label="Small checkbox" />
      <Checkbox {...args} size="medium" aria-label="Medium checkbox" />
      <Checkbox {...args} size="large" aria-label="Large checkbox" />
    </div>
  ),
};

export const Invalid: CheckboxStory = {
  args: {
    invalid: true,
    'aria-label': 'Invalid checkbox',
  },
};

export const Disabled: CheckboxStory = {
  args: {
    disabled: true,
    defaultChecked: true,
    'aria-label': 'Disabled checkbox',
  },
};
