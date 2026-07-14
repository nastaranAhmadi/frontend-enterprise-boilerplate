import type { ComponentProps, ReactNode } from 'react';
import { useState } from 'react';

import { TimePicker } from './TimePicker';

const StatefulTimePicker = (props: ComponentProps<typeof TimePicker>) => {
  const [value, setValue] = useState(props.value ?? props.defaultValue ?? null);
  return <TimePicker {...props} value={value} onChange={setValue} />;
};

export default {
  title: 'Base/TimePicker',
  component: TimePicker,
  tags: ['autodocs'],
  decorators: [
    (Story: () => ReactNode) => (
      <div className="max-w-sm p-md">
        <Story />
      </div>
    ),
  ],
};

export const Default = {
  render: () => <StatefulTimePicker locale="en" placeholder="Select time" />,
};

export const WithValue = {
  render: () => <StatefulTimePicker locale="en" defaultValue="14:30" />,
};

export const AmPm = {
  render: () => <StatefulTimePicker locale="en" ampm defaultValue="14:30" />,
};

export const PersianDigits = {
  render: () => <StatefulTimePicker locale="fa" defaultValue="09:15" />,
};
