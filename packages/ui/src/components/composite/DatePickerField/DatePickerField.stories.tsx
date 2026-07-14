import type { ComponentProps, ReactElement } from 'react';
import { useState } from 'react';

import { DesignSystemProvider } from '../../../providers/DesignSystemProvider';
import { DatePickerField } from './DatePickerField';

const meta = {
  title: 'Composite/DatePickerField',
  component: DatePickerField,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'Form field that composes Label, DatePicker, HelperText, and ErrorMessage with shared accessibility ids.',
      },
    },
  },
  argTypes: {
    className: { control: false },
    datePickerRootClassName: { control: false },
    onChange: { control: false },
    onOpenChange: { control: false },
  },
  args: {
    id: 'hire-date',
    label: 'Hire date',
    helperText: 'Pick the employee start date.',
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

type StoryProps = ComponentProps<typeof DatePickerField>;

const StatefulDatePickerField = (props: StoryProps) => {
  const [value, setValue] = useState(props.value ?? props.defaultValue ?? null);
  return <DatePickerField {...props} value={value} onChange={setValue} />;
};

export const Playground = {
  render: (args: StoryProps) => <StatefulDatePickerField {...args} />,
};

export const WithError = {
  args: {
    error: 'Hire date is required',
    required: true,
  },
  render: (args: StoryProps) => <StatefulDatePickerField {...args} />,
};

export const JalaliLocale = {
  render: () => (
    <DesignSystemProvider locale="fa-IR" theme="light">
      <div dir="rtl">
        <StatefulDatePickerField
          id="jalali-date"
          label="تاریخ شروع"
          helperText="تقویم جلالی با ارقام فارسی"
          calendar="persian"
          locale="fa"
          placeholder="انتخاب تاریخ"
          todayLabel="امروز"
          clearLabel="پاک کردن"
          defaultValue="2026-07-13"
        />
      </div>
    </DesignSystemProvider>
  ),
};
