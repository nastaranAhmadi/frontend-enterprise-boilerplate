import type { ComponentProps, ReactNode } from 'react';
import { useState } from 'react';

import { DateTimePicker } from './DateTimePicker';

const StatefulDateTimePicker = (props: ComponentProps<typeof DateTimePicker>) => {
  const [value, setValue] = useState(props.value ?? props.defaultValue ?? null);
  return <DateTimePicker {...props} value={value} onChange={setValue} />;
};

export default {
  title: 'Base/DateTimePicker',
  component: DateTimePicker,
  tags: ['autodocs'],
  decorators: [
    (Story: () => ReactNode) => (
      <div className="max-w-sm p-md">
        <Story />
      </div>
    ),
  ],
};

export const Gregorian = {
  render: () => (
    <StatefulDateTimePicker calendar="gregorian" locale="en" defaultValue="2026-07-13T12:00" />
  ),
};

export const Persian = {
  render: () => (
    <StatefulDateTimePicker
      calendar="persian"
      locale="fa"
      defaultValue="2026-07-13T12:00"
      placeholder="انتخاب تاریخ و زمان"
    />
  ),
};

export const AmPm = {
  render: () => <StatefulDateTimePicker locale="en" ampm defaultValue="2026-07-13T14:30" />,
};
