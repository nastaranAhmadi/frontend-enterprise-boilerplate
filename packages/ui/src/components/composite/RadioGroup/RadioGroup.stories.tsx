import type { ComponentProps, ReactElement } from 'react';

import { Radio } from '../../base/Radio';
import { RadioGroup } from './RadioGroup';

const meta = {
  title: 'Composite/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'Composite radio group with legend, shared name, helper text, and error message. Compose options with Radio children.',
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
    children: { control: false },
  },
  args: {
    name: 'plan',
    label: 'Choose a plan',
    helperText: 'Select the plan that fits your needs.',
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

type RadioGroupStory = {
  args?: Partial<ComponentProps<typeof RadioGroup>>;
  render?: (args: ComponentProps<typeof RadioGroup>) => ReactElement;
};

const PlanOptions = () => (
  <>
    <Radio value="free" label="Free — $0/month" />
    <Radio value="pro" label="Pro — $12/month" />
    <Radio value="team" label="Team — $29/month" />
  </>
);

export const Playground: RadioGroupStory = {
  render: (args) => (
    <RadioGroup {...args}>
      <PlanOptions />
    </RadioGroup>
  ),
};

export const WithError: RadioGroupStory = {
  render: (args) => (
    <RadioGroup {...args} error="Please choose a plan.">
      <PlanOptions />
    </RadioGroup>
  ),
};

export const Required: RadioGroupStory = {
  render: (args) => (
    <RadioGroup {...args} required>
      <PlanOptions />
    </RadioGroup>
  ),
};

export const Disabled: RadioGroupStory = {
  render: (args) => (
    <RadioGroup {...args} disabled defaultValue="pro">
      <PlanOptions />
    </RadioGroup>
  ),
};

export const Sizes: RadioGroupStory = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: '100%' }}>
      <RadioGroup {...args} label="Small" size="small">
        <Radio value="a" label="Option A" />
        <Radio value="b" label="Option B" />
      </RadioGroup>
      <RadioGroup {...args} label="Medium" size="medium">
        <Radio value="a" label="Option A" />
        <Radio value="b" label="Option B" />
      </RadioGroup>
      <RadioGroup {...args} label="Large" size="large">
        <Radio value="a" label="Option A" />
        <Radio value="b" label="Option B" />
      </RadioGroup>
    </div>
  ),
  args: {
    helperText: 'Shared helper text',
  },
};
