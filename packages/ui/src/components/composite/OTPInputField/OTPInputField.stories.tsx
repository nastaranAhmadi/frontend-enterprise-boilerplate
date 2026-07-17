import type { ComponentProps, ReactElement } from 'react';

import { OTPInputField } from './index';

const meta = {
  title: 'Composite/OTPInputField',
  component: OTPInputField,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
  argTypes: {
    className: { control: false },
    otpInputRootClassName: { control: false },
  },
  args: {
    label: 'Secure code',
    helperText: 'This is a hint text to help user.',
    length: 4,
    required: true,
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

type StoryProps = ComponentProps<typeof OTPInputField>;

export const Playground = {
  render: (args: StoryProps) => <OTPInputField {...args} />,
};

export const WithSeparator = {
  args: {
    label: 'Verification code',
    length: 6,
    separator: true,
  },
  render: (args: StoryProps) => <OTPInputField {...args} />,
};

export const WithError = {
  args: {
    error: 'Invalid verification code',
    defaultValue: '12',
    invalid: false,
  },
  render: (args: StoryProps) => <OTPInputField {...args} />,
};

export const RtlLayout = {
  render: () => (
    <div dir="rtl" className="flex flex-col gap-sm">
      <p className="text-sm text-muted">Label and hint stay centered; OTP cells remain LTR.</p>
      <OTPInputField
        label="Secure code"
        helperText="This is a hint text to help user."
        length={6}
        separator
        required
      />
    </div>
  ),
};
