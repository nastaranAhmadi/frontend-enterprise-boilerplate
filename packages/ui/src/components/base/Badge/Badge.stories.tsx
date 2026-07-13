import type { ComponentProps, ReactElement } from 'react';

import { Badge } from './Badge';

const meta = {
  title: 'Base/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'Overlay badge for counts and compact status on top of another element, similar to Material UI Badge. Use `badgeAriaLabel` for icon-only triggers so screen readers announce the count (for example `"4 unread messages"`).',
      },
    },
  },
  argTypes: {
    children: { control: false },
    badgeContent: { control: 'number' },
    variant: {
      control: 'select',
      options: ['standard', 'dot'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info', 'neutral'],
    },
    overlap: {
      control: 'select',
      options: ['rectangular', 'circular'],
    },
    invisible: { control: 'boolean' },
    showZero: { control: 'boolean' },
    max: { control: 'number' },
    className: { control: false },
    badgeAriaLabel: { control: 'text' },
    badgeClassName: { control: false },
    anchorOrigin: { control: false },
  },
  args: {
    badgeContent: 4,
    color: 'primary',
    variant: 'standard',
    overlap: 'rectangular',
    invisible: false,
    showZero: false,
    max: 99,
  },
};

export default meta;

type BadgeStory = {
  args?: Partial<ComponentProps<typeof Badge>>;
  render?: (args: ComponentProps<typeof Badge>) => ReactElement;
};

const MailIcon = () => (
  <span
    aria-hidden="true"
    style={{
      display: 'inline-flex',
      width: 28,
      height: 28,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8,
      background: 'var(--color-muted)',
      color: 'var(--color-foreground)',
      fontSize: 18,
    }}
  >
    ✉
  </span>
);

const CircleIcon = () => (
  <span
    aria-hidden="true"
    style={{
      display: 'inline-flex',
      width: 40,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
      background: 'var(--color-muted)',
      color: 'var(--color-foreground)',
    }}
  >
    ○
  </span>
);

const RectangleIcon = () => (
  <span
    aria-hidden="true"
    style={{
      display: 'inline-block',
      width: 40,
      height: 28,
      borderRadius: 8,
      background: 'var(--color-muted)',
    }}
  />
);

export const Playground: BadgeStory = {
  render: (args) => (
    <Badge {...args}>
      <MailIcon />
    </Badge>
  ),
};

export const BadgeContent: BadgeStory = {
  render: () => (
    <Badge badgeContent={4} color="primary">
      <MailIcon />
    </Badge>
  ),
};

export const DotBadge: BadgeStory = {
  render: () => (
    <Badge variant="dot" color="secondary">
      <MailIcon />
    </Badge>
  ),
};

export const ShowZero: BadgeStory = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <Badge badgeContent={0} color="secondary">
        <MailIcon />
      </Badge>
      <Badge badgeContent={0} showZero color="secondary">
        <MailIcon />
      </Badge>
    </div>
  ),
};

export const MaximumValue: BadgeStory = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <Badge badgeContent={99} color="secondary">
        <MailIcon />
      </Badge>
      <Badge badgeContent={100} color="secondary">
        <MailIcon />
      </Badge>
      <Badge badgeContent={1000} max={999} color="secondary">
        <MailIcon />
      </Badge>
    </div>
  ),
};

export const Colors: BadgeStory = {
  render: () => (
    <div style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
      <Badge badgeContent={8} color="primary">
        <MailIcon />
      </Badge>
      <Badge badgeContent={2} color="success">
        <MailIcon />
      </Badge>
      <Badge badgeContent={1} color="error">
        <MailIcon />
      </Badge>
      <Badge badgeContent={5} color="warning">
        <MailIcon />
      </Badge>
      <Badge badgeContent={3} color="info">
        <MailIcon />
      </Badge>
    </div>
  ),
};

export const AnchorOrigin: BadgeStory = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
      <Badge badgeContent={12} color="secondary">
        <MailIcon />
      </Badge>
      <Badge
        badgeContent={12}
        color="secondary"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <MailIcon />
      </Badge>
      <Badge
        badgeContent={12}
        color="secondary"
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <MailIcon />
      </Badge>
      <Badge
        badgeContent={12}
        color="secondary"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <MailIcon />
      </Badge>
    </div>
  ),
};

export const Overlap: BadgeStory = {
  render: () => (
    <div style={{ display: 'flex', gap: 28, alignItems: 'center', flexWrap: 'wrap' }}>
      <Badge badgeContent={1} color="secondary">
        <RectangleIcon />
      </Badge>
      <Badge variant="dot" color="secondary">
        <RectangleIcon />
      </Badge>
      <Badge badgeContent={1} overlap="circular" color="secondary">
        <CircleIcon />
      </Badge>
      <Badge variant="dot" overlap="circular" color="secondary">
        <CircleIcon />
      </Badge>
    </div>
  ),
};

export const WithButton: BadgeStory = {
  render: () => (
    <button
      type="button"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 44,
        height: 44,
        border: '1px solid var(--color-border)',
        borderRadius: 8,
        background: 'var(--color-background)',
        cursor: 'pointer',
      }}
    >
      <Badge badgeContent={4} badgeAriaLabel="4 unread messages" color="secondary">
        <MailIcon />
      </Badge>
    </button>
  ),
};
