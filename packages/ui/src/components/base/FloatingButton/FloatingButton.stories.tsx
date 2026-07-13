import type { ComponentProps, ReactElement } from 'react';

import { FloatingButton } from './FloatingButton';

const meta = {
  title: 'Base/FloatingButton',
  component: FloatingButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'Floating action button for the primary screen action. Supports circular and extended variants like Material UI FAB.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['circular', 'extended'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary'],
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    icon: { control: false },
    className: { control: false },
  },
  args: {
    'aria-label': 'Add',
    variant: 'circular',
    size: 'large',
    color: 'primary',
    disabled: false,
    loading: false,
  },
};

export default meta;

type FloatingButtonStory = {
  args?: Partial<ComponentProps<typeof FloatingButton>>;
  render?: (args: ComponentProps<typeof FloatingButton>) => ReactElement;
};

const PlusIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor">
    <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
  </svg>
);

const EditIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor">
    <path d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z" />
  </svg>
);

const NavigateIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor">
    <path d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z" />
  </svg>
);

export const Playground: FloatingButtonStory = {
  render: (args) => (
    <FloatingButton {...args}>
      <PlusIcon />
    </FloatingButton>
  ),
};

export const Basic: FloatingButtonStory = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
      <FloatingButton aria-label="Add" color="primary">
        <PlusIcon />
      </FloatingButton>
      <FloatingButton aria-label="Edit" color="secondary">
        <EditIcon />
      </FloatingButton>
      <FloatingButton variant="extended" color="primary" icon={<NavigateIcon />}>
        Navigate
      </FloatingButton>
      <FloatingButton aria-label="Like" disabled>
        <PlusIcon />
      </FloatingButton>
    </div>
  ),
};

export const Sizes: FloatingButtonStory = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
      <FloatingButton aria-label="Add small" size="small">
        <PlusIcon />
      </FloatingButton>
      <FloatingButton aria-label="Add medium" size="medium">
        <PlusIcon />
      </FloatingButton>
      <FloatingButton aria-label="Add large" size="large">
        <PlusIcon />
      </FloatingButton>
    </div>
  ),
};

export const ExtendedSizes: FloatingButtonStory = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
      <FloatingButton variant="extended" size="small" icon={<NavigateIcon />}>
        Extended
      </FloatingButton>
      <FloatingButton variant="extended" size="medium" icon={<NavigateIcon />}>
        Extended
      </FloatingButton>
      <FloatingButton variant="extended" size="large" icon={<NavigateIcon />}>
        Extended
      </FloatingButton>
    </div>
  ),
};

export const FixedPosition: FloatingButtonStory = {
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'FABs are often fixed to a screen corner. Use className or a wrapper for layout — the component provides the elevated action button styling.',
      },
    },
  },
  render: () => (
    <div
      style={{
        position: 'relative',
        minHeight: 280,
        width: '100%',
        background: 'var(--color-muted)',
      }}
    >
      <FloatingButton aria-label="Create" className="absolute bottom-6 end-6">
        <PlusIcon />
      </FloatingButton>
    </div>
  ),
};

export const Loading: FloatingButtonStory = {
  args: {
    loading: true,
  },
  render: (args) => (
    <FloatingButton {...args}>
      <PlusIcon />
    </FloatingButton>
  ),
};
