import type { ComponentProps, ReactElement } from 'react';

import { Loading } from './Loading';

const meta = {
  title: 'Base/Loading',
  component: Loading,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'Animated loading indicators for inline and full-page loading states. Variants mirror common dot, typing, circular, and grid loaders.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'dots-3',
        'dot-bounce',
        'dots-5',
        'typing',
        'dot-matrix',
        'dots-bounce',
        'circular',
        'grid',
      ],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    label: { control: 'text' },
    className: { control: false },
  },
  args: {
    variant: 'dots-3',
    size: 'medium',
    label: 'Loading',
  },
};

export default meta;

type LoadingStory = {
  args?: Partial<ComponentProps<typeof Loading>>;
  render?: (args: ComponentProps<typeof Loading>) => ReactElement;
};

const variantLabels = {
  'dots-3': 'Three Dot Loading',
  'dot-bounce': 'Bouncing Dot',
  'dots-5': 'Five Dot Loading',
  typing: 'Typing Indicator',
  'dot-matrix': 'Dot Matrix Loader',
  'dots-bounce': 'Bouncing Dots',
  circular: 'Circular Progress Loader',
  grid: 'Grid Loader',
} as const;

export const Playground: LoadingStory = {};

export const AllVariants: LoadingStory = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, minmax(140px, 1fr))',
        gap: 32,
        padding: 24,
      }}
    >
      {(Object.keys(variantLabels) as Array<keyof typeof variantLabels>).map((variant) => (
        <div
          key={variant}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <Loading variant={variant} label={variantLabels[variant]} />
          <span style={{ fontSize: 12, textAlign: 'center' }}>{variantLabels[variant]}</span>
        </div>
      ))}
    </div>
  ),
};

export const Sizes: LoadingStory = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <Loading size="small" variant="dots-3" />
      <Loading size="medium" variant="dots-3" />
      <Loading size="large" variant="dots-3" />
    </div>
  ),
};

export const InlineUsage: LoadingStory = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Loading variant="circular" size="small" label="Saving changes" />
      <span>Saving changes…</span>
    </div>
  ),
};
