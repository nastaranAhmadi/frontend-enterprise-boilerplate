import type { ComponentProps, ReactElement } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '../../composite/Card';
import { Skeleton } from './Skeleton';

const meta = {
  title: 'Base/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'Loading placeholder for content that has not yet loaded. Decorative by default via aria-hidden.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'circular', 'rectangular', 'rounded'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    animate: { control: 'boolean' },
    className: { control: false },
  },
  args: {
    variant: 'rounded',
    size: 'medium',
    animate: true,
  },
  decorators: [
    (Story: () => ReactElement) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type SkeletonStory = {
  args?: Partial<ComponentProps<typeof Skeleton>>;
  render?: (args: ComponentProps<typeof Skeleton>) => ReactElement;
};

export const Playground: SkeletonStory = {};

export const Variants: SkeletonStory = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Skeleton {...args} variant="text" />
      <Skeleton {...args} variant="rounded" />
      <Skeleton {...args} variant="rectangular" />
      <Skeleton {...args} className="h-lg w-lg" variant="circular" />
    </div>
  ),
  args: {},
};

export const Sizes: SkeletonStory = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Skeleton {...args} size="small" />
      <Skeleton {...args} size="medium" />
      <Skeleton {...args} size="large" />
    </div>
  ),
  args: {
    variant: 'text',
  },
};

export const CardLoading: SkeletonStory = {
  render: () => (
    <Card aria-busy="true" variant="outlined">
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-md w-2/3" variant="text" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton className="w-4/5" variant="text" />
        </div>
      </CardContent>
    </Card>
  ),
};

export const WithoutAnimation: SkeletonStory = {
  args: {
    animate: false,
  },
};
