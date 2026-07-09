import type { ComponentProps, ReactElement } from 'react';

import { Select } from './Select';

const countryChildren = (
  <>
    <option disabled value="">
      Choose a country
    </option>
    <option value="us">United States</option>
    <option value="ca">Canada</option>
    <option value="mx">Mexico</option>
  </>
);

const meta = {
  title: 'Base/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'Base native select primitive with adornment slots. Pass options as native <option> children.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'outlined', 'standard'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    invalid: { control: 'boolean' },
    disabled: { control: 'boolean' },
    children: { control: false },
    startAdornment: { control: false },
    endAdornment: { control: false },
    className: { control: false },
  },
  args: {
    'aria-label': 'Country',
    children: countryChildren,
    variant: 'outlined',
    size: 'medium',
    invalid: false,
    disabled: false,
  },
  decorators: [
    (Story: () => ReactElement) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type SelectStory = {
  args?: Partial<ComponentProps<typeof Select>>;
  render?: (args: ComponentProps<typeof Select>) => ReactElement;
};

export const Playground: SelectStory = {};

export const Variants: SelectStory = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
      <Select {...args} variant="filled" aria-label="Filled select" />
      <Select {...args} variant="outlined" aria-label="Outlined select" />
      <Select {...args} variant="standard" aria-label="Standard select" />
    </div>
  ),
  args: {
    invalid: false,
    disabled: false,
  },
};

export const Sizes: SelectStory = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
      <Select {...args} size="small" aria-label="Small select" />
      <Select {...args} size="medium" aria-label="Medium select" />
      <Select {...args} size="large" aria-label="Large select" />
    </div>
  ),
  args: {},
};

export const Invalid: SelectStory = {
  args: {
    invalid: true,
    'aria-label': 'Invalid country',
  },
};

export const Disabled: SelectStory = {
  args: {
    disabled: true,
    'aria-label': 'Disabled country',
  },
};

export const WithAdornments: SelectStory = {
  args: {
    startAdornment: <span aria-hidden="true">🌎</span>,
    endAdornment: <span aria-hidden="true">▾</span>,
  },
};
