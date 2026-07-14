import type { ComponentProps, ReactNode } from 'react';
import { useState } from 'react';

import { TimeClock } from './TimeClock';

const StatefulTimeClock = (props: ComponentProps<typeof TimeClock>) => {
  const [value, setValue] = useState(props.value ?? '09:00');
  return <TimeClock {...props} value={value} onChange={setValue} />;
};

export default {
  title: 'Base/TimeClock',
  component: TimeClock,
  tags: ['autodocs'],
  decorators: [
    (Story: () => ReactNode) => (
      <div className="max-w-xs p-md">
        <Story />
      </div>
    ),
  ],
};

export const Default = {
  render: () => <StatefulTimeClock />,
};

export const WithValue = {
  render: () => <StatefulTimeClock value="14:30" />,
};

export const AmPm = {
  render: () => <StatefulTimeClock ampm value="14:30" />,
};

export const MinuteStep = {
  render: () => <StatefulTimeClock minuteStep={15} value="09:00" />,
};

export const MinMax = {
  render: () => <StatefulTimeClock minTime="09:00" maxTime="17:00" value="12:00" />,
};

export const PersianDigits = {
  render: () => <StatefulTimeClock locale="fa" value="09:15" />,
};

export const Disabled = {
  args: {
    value: '09:30',
    disabled: true,
  },
};
