import type { ComponentProps, ReactElement } from 'react';

import { ErrorMessage } from './ErrorMessage';

const meta = {
  title: 'Base/ErrorMessage',
  component: ErrorMessage,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'Validation error text for form controls. Pair with aria-describedby and aria-invalid on inputs.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    className: { control: false },
  },
  args: {
    children: 'Email is required.',
    id: 'email-error',
    size: 'medium',
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

type ErrorMessageStory = {
  args?: Partial<ComponentProps<typeof ErrorMessage>>;
  render?: (args: ComponentProps<typeof ErrorMessage>) => ReactElement;
};

export const Playground: ErrorMessageStory = {};

export const Sizes: ErrorMessageStory = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <ErrorMessage {...args} size="small">
        Small error message
      </ErrorMessage>
      <ErrorMessage {...args} size="medium">
        Medium error message
      </ErrorMessage>
      <ErrorMessage {...args} size="large">
        Large error message
      </ErrorMessage>
    </div>
  ),
  args: {},
};
