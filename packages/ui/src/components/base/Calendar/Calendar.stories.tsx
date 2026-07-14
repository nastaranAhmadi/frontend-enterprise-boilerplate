import type { ComponentProps, ReactNode } from 'react';

import { Calendar } from './Calendar';

export default {
  title: 'Base/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  decorators: [
    (Story: () => ReactNode) => (
      <div className="max-w-sm p-md">
        <Story />
      </div>
    ),
  ],
};

export const Gregorian: { args: ComponentProps<typeof Calendar> } = {
  args: {
    calendar: 'gregorian',
    locale: 'en',
    selectedIsoDate: '2026-07-13',
  },
};

export const Persian: { args: ComponentProps<typeof Calendar> } = {
  args: {
    calendar: 'persian',
    locale: 'fa',
    selectedIsoDate: '2026-07-13',
  },
};
