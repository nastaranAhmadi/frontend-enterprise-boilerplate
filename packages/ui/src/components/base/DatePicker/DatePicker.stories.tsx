import type { ComponentProps, ReactNode } from 'react';
import { useState } from 'react';

import { DesignSystemProvider } from '../../../providers/DesignSystemProvider';
import { DatePicker } from './DatePicker';

const StatefulDatePicker = (props: ComponentProps<typeof DatePicker>) => {
  const [value, setValue] = useState(props.value ?? props.defaultValue ?? null);
  return <DatePicker {...props} value={value} onChange={setValue} />;
};

export default {
  title: 'Base/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  decorators: [
    (Story: () => ReactNode) => (
      <div className="max-w-sm p-md">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    className: { control: false },
    onChange: { control: false },
    onOpenChange: { control: false },
  },
};

export const Gregorian = {
  render: () => <StatefulDatePicker calendar="gregorian" locale="en" placeholder="Select date" />,
};

export const Persian = {
  render: () => (
    <DesignSystemProvider locale="fa-IR" theme="light">
      <StatefulDatePicker calendar="persian" locale="fa" placeholder="انتخاب تاریخ" />
    </DesignSystemProvider>
  ),
};

export const DarkMode = {
  render: () => (
    <DesignSystemProvider theme="dark" locale="en">
      <StatefulDatePicker calendar="gregorian" defaultValue="2026-07-13" />
    </DesignSystemProvider>
  ),
};

export const Disabled = {
  args: {
    disabled: true,
    defaultValue: '2026-07-13',
    locale: 'en',
  },
};

export const MinMax = {
  render: () => (
    <StatefulDatePicker
      calendar="gregorian"
      locale="en"
      minDate="2026-07-01"
      maxDate="2026-07-31"
      defaultOpen
      defaultValue="2026-07-13"
    />
  ),
};

export const RtlPersian = {
  render: () => (
    <DesignSystemProvider locale="fa-IR" theme="light">
      <div dir="rtl" className="max-w-sm">
        <StatefulDatePicker
          calendar="persian"
          locale="fa"
          defaultOpen
          defaultValue="2026-07-13"
          todayLabel="امروز"
          clearLabel="پاک کردن"
          placeholder="انتخاب تاریخ"
        />
      </div>
    </DesignSystemProvider>
  ),
};

export const EnglishWithPersianCalendar = {
  render: () => (
    <StatefulDatePicker
      calendar="persian"
      locale="en"
      defaultValue="2026-07-13"
      placeholder="Select Persian date"
    />
  ),
};
