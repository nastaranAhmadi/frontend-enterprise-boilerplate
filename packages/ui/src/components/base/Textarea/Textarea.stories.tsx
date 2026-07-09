import type { ComponentProps, ReactElement } from 'react';

import { Textarea } from './Textarea';

const meta = {
  title: 'Base/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'Base native textarea primitive. Reference template for multiline form controls in the design system.',
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
    className: { control: false },
  },
  args: {
    'aria-label': 'Bio',
    placeholder: 'Tell us about yourself',
    rows: 4,
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

type TextareaStory = {
  args?: Partial<ComponentProps<typeof Textarea>>;
  render?: (args: ComponentProps<typeof Textarea>) => ReactElement;
};

export const Playground: TextareaStory = {};

export const Variants: TextareaStory = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
      <Textarea {...args} variant="filled" aria-label="Filled textarea" placeholder="Filled" />
      <Textarea
        {...args}
        variant="outlined"
        aria-label="Outlined textarea"
        placeholder="Outlined"
      />
      <Textarea
        {...args}
        variant="standard"
        aria-label="Standard textarea"
        placeholder="Standard"
      />
    </div>
  ),
  args: {
    invalid: false,
    disabled: false,
  },
};

export const Sizes: TextareaStory = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
      <Textarea {...args} size="small" aria-label="Small textarea" placeholder="Small" />
      <Textarea {...args} size="medium" aria-label="Medium textarea" placeholder="Medium" />
      <Textarea {...args} size="large" aria-label="Large textarea" placeholder="Large" />
    </div>
  ),
  args: {},
};

export const Invalid: TextareaStory = {
  args: {
    invalid: true,
    'aria-label': 'Invalid bio',
    placeholder: 'Invalid value',
  },
};

export const Disabled: TextareaStory = {
  args: {
    disabled: true,
    'aria-label': 'Disabled bio',
    placeholder: 'Disabled',
  },
};
