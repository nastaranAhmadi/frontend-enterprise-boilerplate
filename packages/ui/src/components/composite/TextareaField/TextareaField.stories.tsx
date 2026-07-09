import type { ComponentProps, ReactElement } from 'react';

import { TextareaField } from './TextareaField';

const meta = {
  title: 'Composite/TextareaField',
  component: TextareaField,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'Composite field that wires Label, Textarea, HelperText, and ErrorMessage with shared size, disabled state, and accessibility ids.',
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
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
    className: { control: false },
    textareaRootClassName: { control: false },
  },
  args: {
    id: 'bio',
    label: 'Bio',
    placeholder: 'Tell us about yourself',
    rows: 4,
    helperText: 'A short description for your profile.',
    variant: 'outlined',
    size: 'medium',
    required: false,
    disabled: false,
  },
  decorators: [
    (Story: () => ReactElement) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type TextareaFieldStory = {
  args?: Partial<ComponentProps<typeof TextareaField>>;
  render?: (args: ComponentProps<typeof TextareaField>) => ReactElement;
};

export const Playground: TextareaFieldStory = {};

export const WithError: TextareaFieldStory = {
  args: {
    error: 'Bio is required.',
  },
};

export const Required: TextareaFieldStory = {
  args: {
    required: true,
  },
};

export const Disabled: TextareaFieldStory = {
  args: {
    disabled: true,
  },
};

export const Sizes: TextareaFieldStory = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
      <TextareaField {...args} id="bio-small" label="Small" size="small" placeholder="Small" />
      <TextareaField {...args} id="bio-medium" label="Medium" size="medium" placeholder="Medium" />
      <TextareaField {...args} id="bio-large" label="Large" size="large" placeholder="Large" />
    </div>
  ),
  args: {
    helperText: 'Shared helper text',
  },
};

export const Variants: TextareaFieldStory = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
      <TextareaField
        {...args}
        id="bio-filled"
        label="Filled"
        variant="filled"
        placeholder="Filled"
      />
      <TextareaField
        {...args}
        id="bio-outlined"
        label="Outlined"
        variant="outlined"
        placeholder="Outlined"
      />
      <TextareaField
        {...args}
        id="bio-standard"
        label="Standard"
        variant="standard"
        placeholder="Standard"
      />
    </div>
  ),
  args: {
    helperText: 'Choose a variant',
  },
};
