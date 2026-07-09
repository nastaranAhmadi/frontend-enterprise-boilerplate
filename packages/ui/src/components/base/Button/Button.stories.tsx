import type { ComponentProps, ReactElement } from 'react';

import { Button } from './Button';

const meta = {
  title: 'Base/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'Base action component. This story file is the reference template for new UI components.',
      },
    },
  },
  argTypes: {
    children: { control: 'text' },
    variant: {
      control: 'select',
      options: ['filled', 'outlined', 'text', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info', 'neutral'],
    },
    fullWidth: { control: 'boolean' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    startIcon: { control: false },
    endIcon: { control: false },
    className: { control: false },
  },
  args: {
    children: 'Button',
    variant: 'filled',
    size: 'md',
    color: 'primary',
    disabled: false,
    loading: false,
    fullWidth: false,
  },
};

export default meta;

type ButtonStory = {
  args?: Partial<ComponentProps<typeof Button>>;
  render?: (args: ComponentProps<typeof Button>) => ReactElement;
};

const CircleIcon = () => (
  <span
    aria-hidden="true"
    style={{
      display: 'inline-block',
      width: 10,
      height: 10,
      borderRadius: 999,
      background: 'currentColor',
    }}
  />
);

export const Playground: ButtonStory = {};

export const Variants: ButtonStory = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <Button {...args} variant="filled">
        Filled
      </Button>
      <Button {...args} variant="outlined">
        Outlined
      </Button>
      <Button {...args} variant="text">
        Text
      </Button>
      <Button {...args} variant="ghost">
        Ghost
      </Button>
      <Button {...args} variant="link">
        Link Style
      </Button>
    </div>
  ),
  args: {
    disabled: false,
    loading: false,
  },
};

export const Sizes: ButtonStory = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="md">
        Medium
      </Button>
      <Button {...args} size="lg">
        Large
      </Button>
    </div>
  ),
  args: {},
};

export const WithIcon: ButtonStory = {
  args: {
    startIcon: <CircleIcon />,
    endIcon: <CircleIcon />,
    children: 'Icon Button',
  },
};

export const Loading: ButtonStory = {
  args: {
    loading: true,
    children: 'Loading',
  },
};

export const Disabled: ButtonStory = {
  args: {
    disabled: true,
    children: 'Disabled',
  },
};
