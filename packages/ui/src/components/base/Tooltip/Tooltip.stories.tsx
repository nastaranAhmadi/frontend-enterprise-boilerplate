import type { ComponentProps, ReactElement } from 'react';
import { useState } from 'react';

import { Button } from '../Button';
import { Tooltip } from './Tooltip';

const meta = {
  title: 'Base/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'Displays informative text on hover, focus, or touch. Follows Material UI Tooltip behavior for placement, delays, accessibility, and disabled triggers.',
      },
    },
  },
  argTypes: {
    title: { control: 'text' },
    placement: {
      control: 'select',
      options: [
        'top',
        'top-start',
        'top-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'left',
        'left-start',
        'left-end',
        'right',
        'right-start',
        'right-end',
      ],
    },
    arrow: { control: 'boolean' },
    describeChild: { control: 'boolean' },
    disableInteractive: { control: 'boolean' },
    disableHoverListener: { control: 'boolean' },
    disableFocusListener: { control: 'boolean' },
    disableTouchListener: { control: 'boolean' },
    enterDelay: { control: 'number' },
    leaveDelay: { control: 'number' },
    children: { control: false },
    tooltipClassName: { control: false },
    onOpen: { control: false },
    onClose: { control: false },
  },
  args: {
    title: 'Delete',
    placement: 'top',
    arrow: false,
    describeChild: false,
    disableInteractive: false,
    enterDelay: 100,
    leaveDelay: 0,
  },
};

export default meta;

type TooltipStory = {
  args?: Partial<ComponentProps<typeof Tooltip>>;
  render?: (args: ComponentProps<typeof Tooltip>) => ReactElement;
};

export const Playground: TooltipStory = {
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="outlined">Hover me</Button>
    </Tooltip>
  ),
};

export const Basic: TooltipStory = {
  render: () => (
    <Tooltip title="Delete">
      <Button variant="outlined">Delete</Button>
    </Tooltip>
  ),
};

export const DescribeChild: TooltipStory = {
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <Tooltip title="Delete">
        <Button variant="outlined">Label</Button>
      </Tooltip>
      <Tooltip describeChild title="Does not add if it already exists.">
        <Button>Add</Button>
      </Tooltip>
    </div>
  ),
};

export const Arrow: TooltipStory = {
  render: () => (
    <Tooltip describeChild arrow title="Add">
      <Button>Arrow</Button>
    </Tooltip>
  ),
};

export const Placements: TooltipStory = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 24,
        padding: 80,
      }}
    >
      {(
        [
          'top-start',
          'top',
          'top-end',
          'left-start',
          'bottom',
          'right-end',
          'left',
          'bottom-start',
          'right',
          'left-end',
          'bottom-end',
          'right-start',
        ] as const
      ).map((placement) => (
        <Tooltip key={placement} title={placement} placement={placement} arrow>
          <Button variant="outlined">{placement}</Button>
        </Tooltip>
      ))}
    </div>
  ),
};

export const Controlled: TooltipStory = {
  render: () => {
    const ControlledTooltip = () => {
      const [open, setOpen] = useState(false);

      return (
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Tooltip
            describeChild
            open={open}
            onOpen={() => { setOpen(true); }}
            onClose={() => { setOpen(false); }}
            title="Add"
          >
            <Button>Controlled</Button>
          </Tooltip>
          <Button variant="outlined" onClick={() => { setOpen((value) => !value); }}>
            Toggle
          </Button>
        </div>
      );
    };

    return <ControlledTooltip />;
  },
};

export const Delays: TooltipStory = {
  render: () => (
    <Tooltip describeChild title="Add" enterDelay={500} leaveDelay={200}>
      <Button>[500ms, 200ms]</Button>
    </Tooltip>
  ),
};

export const DisabledElement: TooltipStory = {
  render: () => (
    <Tooltip describeChild title="You don't have permission to do this">
      <span>
        <Button disabled>A Disabled Button</Button>
      </span>
    </Tooltip>
  ),
};

export const LongContent: TooltipStory = {
  render: () => (
    <Tooltip
      describeChild
      title="Tooltips wrap longer helper text by default so the content stays readable without stretching the page layout."
    >
      <Button variant="outlined">Default width</Button>
    </Tooltip>
  ),
};

export const NotInteractive: TooltipStory = {
  render: () => (
    <Tooltip describeChild disableInteractive title="Add">
      <Button>Not interactive</Button>
    </Tooltip>
  ),
};
