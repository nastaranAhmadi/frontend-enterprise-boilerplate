import type { ComponentProps, ReactElement } from 'react';

import { HelperText } from './HelperText';

const meta = {
  title: 'Base/HelperText',
  component: HelperText,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
    docs: {
      description: {
        component: 'Supplementary text for form controls. Pair with aria-describedby on inputs.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    disabled: { control: 'boolean' },
    className: { control: false },
  },
  args: {
    children: 'We will never share your email.',
    id: 'email-helper',
    size: 'medium',
    disabled: false,
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

type HelperTextStory = {
  args?: Partial<ComponentProps<typeof HelperText>>;
  render?: (args: ComponentProps<typeof HelperText>) => ReactElement;
};

export const Playground: HelperTextStory = {};

export const Disabled: HelperTextStory = {
  args: {
    disabled: true,
  },
};

export const Sizes: HelperTextStory = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <HelperText {...args} size="small">
        Small helper text
      </HelperText>
      <HelperText {...args} size="medium">
        Medium helper text
      </HelperText>
      <HelperText {...args} size="large">
        Large helper text
      </HelperText>
    </div>
  ),
  args: {},
};
