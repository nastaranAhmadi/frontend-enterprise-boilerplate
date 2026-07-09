import type { ReactElement } from 'react';

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
