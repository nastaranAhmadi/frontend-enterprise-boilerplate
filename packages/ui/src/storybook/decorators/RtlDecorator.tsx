import type { ReactElement } from 'react';

/** Fixed-width RTL wrapper for stories that need Persian copy regardless of global toolbar. */
export const RtlDecorator = (Story: () => ReactElement) => (
  <div dir="rtl" lang="fa" style={{ width: 420 }}>
    <Story />
  </div>
);

export const LtrDecorator = (Story: () => ReactElement) => (
  <div dir="ltr" lang="en" style={{ width: 420 }}>
    <Story />
  </div>
);
