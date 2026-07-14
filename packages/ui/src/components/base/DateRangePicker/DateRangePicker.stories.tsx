import type { ComponentProps, ReactNode } from 'react';
import { useState } from 'react';

import { EMPTY_DATE_RANGE } from '../../../date/time';
import { DesignSystemProvider } from '../../../providers/DesignSystemProvider';
import { DateRangePicker } from './DateRangePicker';

const StatefulDateRangePicker = (props: ComponentProps<typeof DateRangePicker>) => {
  const [value, setValue] = useState(props.value ?? props.defaultValue ?? EMPTY_DATE_RANGE);
  return <DateRangePicker {...props} value={value} onChange={setValue} />;
};

export default {
  title: 'Base/DateRangePicker',
  component: DateRangePicker,
  tags: ['autodocs'],
  decorators: [
    (Story: () => ReactNode) => (
      <div className="max-w-3xl p-md">
        <Story />
      </div>
    ),
  ],
};

export const WithPresets = {
  render: () => <StatefulDateRangePicker locale="en" defaultOpen />,
};

export const Persian = {
  render: () => (
    <DesignSystemProvider locale="fa-IR">
      <StatefulDateRangePicker
        calendar="persian"
        locale="fa"
        defaultOpen
        placeholder="انتخاب بازه زمانی"
      />
    </DesignSystemProvider>
  ),
};

export const Rtl = {
  render: () => (
    <DesignSystemProvider locale="fa-IR">
      <div dir="rtl">
        <StatefulDateRangePicker calendar="persian" locale="fa" defaultOpen />
      </div>
    </DesignSystemProvider>
  ),
};
