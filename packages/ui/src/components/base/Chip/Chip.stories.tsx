import type { ComponentProps, ReactElement } from 'react';

import { Chip } from './Chip';

const meta = {
  title: 'Base/Chip',
  component: Chip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'Compact element for labels, filters, and actions. Mirrors Material UI Chip patterns. When both `onClick` and `onDelete` are set, the chip is a composite focusable widget with a nested delete control — not a single native button.',
      },
    },
  },
  argTypes: {
    children: { control: 'text' },
    variant: {
      control: 'select',
      options: ['filled', 'outlined'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info', 'neutral'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium'],
    },
    disabled: { control: 'boolean' },
    clickable: { control: 'boolean' },
    icon: { control: false },
    avatar: { control: false },
    deleteIcon: { control: false },
    className: { control: false },
    onClick: { control: false },
    onDelete: { control: false },
    href: { control: 'text' },
  },
  args: {
    children: 'Chip',
    variant: 'filled',
    color: 'neutral',
    size: 'medium',
    disabled: false,
    clickable: false,
  },
};

export default meta;

type ChipStory = {
  args?: Partial<ComponentProps<typeof Chip>>;
  render?: (args: ComponentProps<typeof Chip>) => ReactElement;
};

const FaceIcon = () => (
  <span aria-hidden="true" style={{ fontSize: 16 }}>
    ☺
  </span>
);

const Avatar = ({ label }: { label: string }) => (
  <span
    aria-hidden="true"
    style={{
      display: 'inline-flex',
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--color-primary)',
      color: 'var(--color-background)',
      fontSize: 12,
      fontWeight: 600,
    }}
  >
    {label}
  </span>
);

export const Playground: ChipStory = {};

export const Basic: ChipStory = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <Chip>Chip Filled</Chip>
      <Chip variant="outlined">Chip Outlined</Chip>
    </div>
  ),
};

export const Clickable: ChipStory = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <Chip onClick={() => undefined}>Clickable</Chip>
      <Chip variant="outlined" onClick={() => undefined}>
        Clickable
      </Chip>
    </div>
  ),
};

export const Deletable: ChipStory = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <Chip onDelete={() => undefined}>Deletable</Chip>
      <Chip variant="outlined" onDelete={() => undefined}>
        Deletable
      </Chip>
    </div>
  ),
};

export const ClickableAndDeletable: ChipStory = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <Chip onClick={() => undefined} onDelete={() => undefined}>
        Clickable Deletable
      </Chip>
      <Chip variant="outlined" onClick={() => undefined} onDelete={() => undefined}>
        Clickable Deletable
      </Chip>
    </div>
  ),
};

export const ClickableLink: ChipStory = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <Chip href="#basic-chip" clickable>
        Clickable Link
      </Chip>
      <Chip href="#basic-chip" clickable variant="outlined">
        Clickable Link
      </Chip>
    </div>
  ),
};

export const WithIcon: ChipStory = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <Chip icon={<FaceIcon />}>With Icon</Chip>
      <Chip icon={<FaceIcon />} variant="outlined">
        With Icon
      </Chip>
    </div>
  ),
};

export const WithAvatar: ChipStory = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <Chip avatar={<Avatar label="M" />}>Avatar</Chip>
      <Chip avatar={<Avatar label="N" />} variant="outlined">
        Avatar
      </Chip>
    </div>
  ),
};

export const Colors: ChipStory = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <Chip color="primary">primary</Chip>
        <Chip color="success">success</Chip>
        <Chip color="error">error</Chip>
      </div>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <Chip color="primary" variant="outlined">
          primary
        </Chip>
        <Chip color="success" variant="outlined">
          success
        </Chip>
        <Chip color="error" variant="outlined">
          error
        </Chip>
      </div>
    </div>
  ),
};

export const Sizes: ChipStory = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
      <Chip size="small">Small</Chip>
      <Chip size="small" variant="outlined">
        Small
      </Chip>
      <Chip size="medium">Medium</Chip>
    </div>
  ),
};

export const StatusExamples: ChipStory = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <Chip color="success">Published</Chip>
      <Chip color="warning" variant="outlined">
        Draft
      </Chip>
      <Chip color="error">Archived</Chip>
      <Chip color="info" variant="outlined">
        SEO
      </Chip>
    </div>
  ),
};
