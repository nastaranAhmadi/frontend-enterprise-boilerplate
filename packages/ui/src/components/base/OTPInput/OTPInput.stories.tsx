import type { ComponentProps, ReactElement } from 'react';
import { useState } from 'react';

import { OTPInput } from './index';

const meta = {
  title: 'Base/OTPInput',
  component: OTPInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'Untitled UI-inspired verification code input with segmented cells, paste support, and optional separator for six-digit codes.',
      },
    },
  },
  argTypes: {
    length: { control: 'select', options: [4, 6] },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    separator: { control: 'boolean' },
    disabled: { control: 'boolean' },
    invalid: { control: 'boolean' },
    className: { control: false },
    value: { control: false },
    onChange: { control: false },
    onComplete: { control: false },
  },
  args: {
    length: 4,
    size: 'medium',
    separator: false,
    disabled: false,
    invalid: false,
    'aria-label': 'Verification code',
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

type StoryProps = ComponentProps<typeof OTPInput>;

export const FourDigits = {
  render: (args: StoryProps) => <OTPInput {...args} />,
};

export const SixDigitsWithSeparator = {
  args: { length: 6, separator: true, 'aria-label': 'Secure code' },
  render: (args: StoryProps) => <OTPInput {...args} />,
};

export const Sizes = {
  render: () => (
    <div className="flex flex-col gap-lg">
      <OTPInput size="small" />
      <OTPInput size="medium" />
      <OTPInput size="large" />
    </div>
  ),
};

export const Disabled = {
  args: { disabled: true, defaultValue: '1234' },
  render: (args: StoryProps) => <OTPInput {...args} />,
};

export const Invalid = {
  args: { invalid: true, defaultValue: '12' },
  render: (args: StoryProps) => <OTPInput {...args} />,
};

export const RtlLayout = {
  render: () => (
    <div dir="rtl" className="flex flex-col gap-sm">
      <p className="text-sm text-muted">
        OTP cells stay LTR and display ASCII digits. Persian/Arabic keyboard input is normalized
        automatically.
      </p>
      <OTPInput length={6} separator />
    </div>
  ),
};

export const Controlled = {
  render: () => {
    const ControlledExample = () => {
      const [value, setValue] = useState('');

      return (
        <div className="flex flex-col gap-sm">
          <OTPInput length={4} value={value} onChange={setValue} />
          <p className="text-sm text-muted-foreground">Value: {value || '—'}</p>
        </div>
      );
    };

    return <ControlledExample />;
  },
};
