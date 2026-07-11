import { type ComponentProps, type ReactElement, useState } from 'react';

import { Button } from '../../base/Button';
import { BottomSheet } from './BottomSheet';

const meta = {
  title: 'Composite/BottomSheet',
  component: BottomSheet,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    controls: { expanded: true },
    docs: {
      description: {
        component: 'Mobile-friendly sheet overlay that rises from the bottom of the viewport.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['auto', 'small', 'medium', 'large'],
    },
    showHandle: { control: 'boolean' },
    closeOnBackdropClick: { control: 'boolean' },
    closeOnEscape: { control: 'boolean' },
    className: { control: false },
    contentClassName: { control: false },
    footer: { control: false },
    onClose: { control: false },
  },
  args: {
    size: 'medium',
    showHandle: true,
    closeOnBackdropClick: true,
    closeOnEscape: true,
  },
};

export default meta;

type BottomSheetStory = {
  args?: Partial<ComponentProps<typeof BottomSheet>>;
  render?: (args: Partial<ComponentProps<typeof BottomSheet>>) => ReactElement;
};

const BottomSheetDemo = (args: Partial<ComponentProps<typeof BottomSheet>>) => {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ padding: 24 }}>
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        Open bottom sheet
      </Button>
      <BottomSheet
        {...args}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        title={args.title ?? 'Sort and filter'}
        description={args.description ?? 'Adjust how results are displayed.'}
        footer={
          <div style={{ display: 'flex', gap: 8 }}>
            <Button
              variant="outlined"
              onClick={() => {
                setOpen(false);
              }}
            >
              Reset
            </Button>
            <Button
              onClick={() => {
                setOpen(false);
              }}
            >
              Apply
            </Button>
          </div>
        }
      >
        {args.children ?? 'Choose sorting, status, and date range options.'}
      </BottomSheet>
    </div>
  );
};

export const Playground: BottomSheetStory = {
  render: (args) => <BottomSheetDemo {...args} />,
};

export const Sizes: BottomSheetStory = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 24 }}>
      <BottomSheetDemo size="small" title="Small sheet" />
      <BottomSheetDemo size="medium" title="Medium sheet" />
      <BottomSheetDemo size="large" title="Large sheet" />
    </div>
  ),
};
