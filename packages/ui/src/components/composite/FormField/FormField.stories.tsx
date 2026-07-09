import type { ComponentProps, ReactElement } from 'react';

import { FormField } from './FormField';

const meta = {
  title: 'Composite/FormField',
  component: FormField,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'Composite field that wires Label, Input, HelperText, and ErrorMessage with shared size, disabled state, and accessibility ids.',
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
    inputRootClassName: { control: false },
    startAdornment: { control: false },
    endAdornment: { control: false },
  },
  args: {
    id: 'email',
    label: 'Email address',
    placeholder: 'you@example.com',
    helperText: 'We will never share your email.',
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

type FormFieldStory = {
  args?: Partial<ComponentProps<typeof FormField>>;
  render?: (args: ComponentProps<typeof FormField>) => ReactElement;
};

export const Playground: FormFieldStory = {};

export const WithError: FormFieldStory = {
  args: {
    error: 'Email is required.',
  },
};

export const Required: FormFieldStory = {
  args: {
    required: true,
  },
};

export const Disabled: FormFieldStory = {
  args: {
    disabled: true,
  },
};

export const Sizes: FormFieldStory = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
      <FormField {...args} id="email-small" label="Small" size="small" placeholder="Small" />
      <FormField {...args} id="email-medium" label="Medium" size="medium" placeholder="Medium" />
      <FormField {...args} id="email-large" label="Large" size="large" placeholder="Large" />
    </div>
  ),
  args: {
    helperText: 'Shared helper text',
  },
};

export const Variants: FormFieldStory = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
      <FormField {...args} id="email-filled" label="Filled" variant="filled" placeholder="Filled" />
      <FormField
        {...args}
        id="email-outlined"
        label="Outlined"
        variant="outlined"
        placeholder="Outlined"
      />
      <FormField
        {...args}
        id="email-standard"
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
