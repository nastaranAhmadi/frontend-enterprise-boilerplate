import type { ComponentProps, ReactElement } from 'react';

import { SelectField } from './SelectField';

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

const ChevronIcon = () => (
  <span aria-hidden="true" style={{ display: 'inline-block', width: 10, height: 10 }}>
    ▾
  </span>
);

const meta = {
  title: 'Composite/SelectField',
  component: SelectField,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'Composite field that wires Label, Select, HelperText, and ErrorMessage with shared size, disabled state, and accessibility ids.',
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
    selectRootClassName: { control: false },
    children: { control: false },
    startAdornment: { control: false },
    endAdornment: { control: false },
  },
  args: {
    id: 'country',
    label: 'Country',
    helperText: 'Select your country of residence.',
    children: countryChildren,
    variant: 'outlined',
    size: 'medium',
    required: false,
    disabled: false,
    endAdornment: <ChevronIcon />,
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

type SelectFieldStory = {
  args?: Partial<ComponentProps<typeof SelectField>>;
  render?: (args: ComponentProps<typeof SelectField>) => ReactElement;
};

export const Playground: SelectFieldStory = {};

export const WithError: SelectFieldStory = {
  args: {
    error: 'Country is required.',
  },
};

export const Required: SelectFieldStory = {
  args: {
    required: true,
  },
};

export const Disabled: SelectFieldStory = {
  args: {
    disabled: true,
  },
};

export const Sizes: SelectFieldStory = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
      <SelectField {...args} id="country-small" label="Small" size="small" />
      <SelectField {...args} id="country-medium" label="Medium" size="medium" />
      <SelectField {...args} id="country-large" label="Large" size="large" />
    </div>
  ),
  args: {
    helperText: 'Shared helper text',
  },
};

export const Variants: SelectFieldStory = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
      <SelectField {...args} id="country-filled" label="Filled" variant="filled" />
      <SelectField {...args} id="country-outlined" label="Outlined" variant="outlined" />
      <SelectField {...args} id="country-standard" label="Standard" variant="standard" />
    </div>
  ),
  args: {
    helperText: 'Choose a variant',
  },
};
