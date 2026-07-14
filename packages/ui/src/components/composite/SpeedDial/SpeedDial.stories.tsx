import type { ComponentProps, ReactElement } from 'react';

import { SpeedDial } from './index';

const CopyIcon = () => <span aria-hidden="true">C</span>;
const SaveIcon = () => <span aria-hidden="true">S</span>;
const PrintIcon = () => <span aria-hidden="true">P</span>;

const meta = {
  title: 'Composite/SpeedDial',
  component: SpeedDial,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'Floating action button that reveals related actions. Uses FloatingButton as the main trigger. Only direct `SpeedDial.Action` children are supported. Persistent labels use inline tooltip spans; use `Tooltip` for hover/focus cases.',
      },
    },
  },
  argTypes: {
    direction: {
      control: 'select',
      options: ['up', 'down', 'left', 'right'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    disabled: { control: 'boolean' },
    tooltipOpen: { control: 'boolean' },
    className: { control: false },
    children: { control: false },
    icon: { control: false },
    openIcon: { control: false },
  },
  args: {
    'aria-label': 'Create',
    direction: 'up',
    color: 'primary',
    size: 'large',
    disabled: false,
    tooltipOpen: false,
  },
};

export default meta;

type SpeedDialStory = {
  args?: Partial<ComponentProps<typeof SpeedDial>>;
  render?: (args: ComponentProps<typeof SpeedDial>) => ReactElement;
};

export const Playground: SpeedDialStory = {
  render: (args) => (
    <SpeedDial {...args}>
      <SpeedDial.Action icon={<CopyIcon />} tooltip="Copy" />
      <SpeedDial.Action icon={<SaveIcon />} tooltip="Save" />
      <SpeedDial.Action icon={<PrintIcon />} tooltip="Print" />
    </SpeedDial>
  ),
};

export const Directions: SpeedDialStory = {
  render: () => (
    <div className="grid grid-cols-2 gap-3xl p-3xl">
      {(['up', 'down', 'left', 'right'] as const).map((direction) => (
        <div key={direction} className="flex min-h-40 items-center justify-center">
          <SpeedDial aria-label={`Create ${direction}`} direction={direction}>
            <SpeedDial.Action icon={<CopyIcon />} tooltip="Copy" />
            <SpeedDial.Action icon={<SaveIcon />} tooltip="Save" />
          </SpeedDial>
        </div>
      ))}
    </div>
  ),
};

export const PersistentTooltips: SpeedDialStory = {
  args: { tooltipOpen: true },
  render: (args) => (
    <SpeedDial {...args}>
      <SpeedDial.Action icon={<CopyIcon />} tooltip="Copy" />
      <SpeedDial.Action icon={<SaveIcon />} tooltip="Save" />
      <SpeedDial.Action icon={<PrintIcon />} tooltip="Print" />
    </SpeedDial>
  ),
};

export const FixedPosition: SpeedDialStory = {
  render: (args) => (
    <div className="relative h-64 w-full rounded-lg border border-border bg-background">
      <div className="absolute bottom-lg end-lg">
        <SpeedDial {...args}>
          <SpeedDial.Action icon={<CopyIcon />} tooltip="Copy" />
          <SpeedDial.Action icon={<SaveIcon />} tooltip="Save" />
        </SpeedDial>
      </div>
    </div>
  ),
};
