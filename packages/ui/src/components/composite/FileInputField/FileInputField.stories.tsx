import type { ComponentProps, ReactElement } from 'react';

import { FileInputField } from './index';

const meta = {
  title: 'Composite/FileInputField',
  component: FileInputField,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
  argTypes: {
    className: { control: false },
    fileInputRootClassName: { control: false },
  },
  args: {
    label: 'Attachments',
    helperText: 'Upload files to add to this project (max. 1 MB).',
    hint: 'SVG, PNG, JPG or GIF (max. 800x400px)',
    required: false,
    disabled: false,
  },
  decorators: [
    (Story: () => ReactElement) => (
      <div style={{ width: 480 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type StoryProps = ComponentProps<typeof FileInputField>;

export const Playground = {
  render: (args: StoryProps) => <FileInputField {...args} />,
};

export const WithError = {
  args: {
    error: 'Upload failed, please try again',
    required: true,
  },
  render: (args: StoryProps) => <FileInputField {...args} />,
};
