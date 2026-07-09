import type { ComponentProps, ReactElement } from 'react';

import { Input } from './Input';

const meta = {
  title: 'Base/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'Base text input primitive with adornment slots. Reference template for form controls in the design system.',
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
    startAdornment: { control: false },
    endAdornment: { control: false },
    className: { control: false },
  },
  args: {
    'aria-label': 'Email',
    placeholder: 'you@example.com',
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

type InputStory = {
  args?: Partial<ComponentProps<typeof Input>>;
  render?: (args: ComponentProps<typeof Input>) => ReactElement;
};

const SearchIcon = () => (
  <span
    aria-hidden="true"
    style={{
      display: 'inline-block',
      width: 14,
      height: 14,
      borderRadius: 999,
      border: '2px solid currentColor',
    }}
  />
);

export const Playground: InputStory = {};

export const Variants: InputStory = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
      <Input {...args} variant="filled" aria-label="Filled input" placeholder="Filled" />
      <Input {...args} variant="outlined" aria-label="Outlined input" placeholder="Outlined" />
      <Input {...args} variant="standard" aria-label="Standard input" placeholder="Standard" />
    </div>
  ),
  args: {
    invalid: false,
    disabled: false,
  },
};

export const Sizes: InputStory = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
      <Input {...args} size="small" aria-label="Small input" placeholder="Small" />
      <Input {...args} size="medium" aria-label="Medium input" placeholder="Medium" />
      <Input {...args} size="large" aria-label="Large input" placeholder="Large" />
    </div>
  ),
  args: {},
};

export const WithAdornments: InputStory = {
  args: {
    startAdornment: <SearchIcon />,
    endAdornment: <SearchIcon />,
    'aria-label': 'Search',
    placeholder: 'Search…',
  },
};

export const Invalid: InputStory = {
  args: {
    invalid: true,
    'aria-label': 'Invalid email',
    placeholder: 'Invalid value',
  },
};

export const Disabled: InputStory = {
  args: {
    disabled: true,
    'aria-label': 'Disabled input',
    placeholder: 'Disabled',
  },
};
