import type { ComponentProps, ReactElement } from 'react';

import { CheckboxField } from './CheckboxField';

const meta = {
  title: 'Composite/CheckboxField',
  component: CheckboxField,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'Composite field with inline label beside the checkbox, plus optional helper text and error message.',
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
    checkboxRootClassName: { control: false },
  },
  args: {
    id: 'terms',
    label: 'Accept terms and conditions',
    helperText: 'You must accept to continue.',
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

type CheckboxFieldStory = {
  args?: Partial<ComponentProps<typeof CheckboxField>>;
  render?: (args: ComponentProps<typeof CheckboxField>) => ReactElement;
};

export const Playground: CheckboxFieldStory = {};

export const WithError: CheckboxFieldStory = {
  args: {
    error: 'You must accept the terms.',
  },
};

export const Required: CheckboxFieldStory = {
  args: {
    required: true,
  },
};

export const Disabled: CheckboxFieldStory = {
  args: {
    disabled: true,
    defaultChecked: true,
  },
};

export const Sizes: CheckboxFieldStory = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
      <CheckboxField {...args} id="terms-small" label="Small" size="small" />
      <CheckboxField {...args} id="terms-medium" label="Medium" size="medium" />
      <CheckboxField {...args} id="terms-large" label="Large" size="large" />
    </div>
  ),
  args: {
    helperText: 'Shared helper text',
  },
};
