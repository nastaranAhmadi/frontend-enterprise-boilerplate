import type { ComponentProps, ReactElement } from 'react';
import { useState } from 'react';

import { Alert } from './Alert';

const meta = {
  title: 'Base/Alert',
  component: Alert,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'Inline status message for success, error, warning, info, and neutral feedback. Error and warning use `role="alert"` by default.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['success', 'error', 'warning', 'info', 'neutral'],
    },
    icon: { control: false },
    onClose: { control: false },
    className: { control: false },
  },
  args: {
    title: 'Alert title',
    children: 'Supporting details for this status message.',
    variant: 'info',
  },
  decorators: [
    (Story: () => ReactElement) => (
      <div style={{ width: 420 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type AlertStory = {
  args?: Partial<ComponentProps<typeof Alert>>;
  render?: (args: ComponentProps<typeof Alert>) => ReactElement;
};

export const Playground: AlertStory = {
  render: (args) => <Alert {...args} />,
};

export const Variants: AlertStory = {
  render: () => (
    <div className="flex flex-col gap-md">
      <Alert variant="success" title="Success">
        Changes saved successfully.
      </Alert>
      <Alert variant="error" title="Error">
        Unable to complete this request.
      </Alert>
      <Alert variant="warning" title="Warning">
        Review these values before continuing.
      </Alert>
      <Alert variant="info" title="Info">
        A new version is available.
      </Alert>
      <Alert variant="neutral" title="Neutral">
        Session expires in 10 minutes.
      </Alert>
    </div>
  ),
};

export const Dismissible: AlertStory = {
  render: function DismissibleStory() {
    const [open, setOpen] = useState(true);
    if (!open) {
      return (
        <button
          type="button"
          onClick={() => {
            setOpen(true);
          }}
        >
          Show alert
        </button>
      );
    }

    return (
      <Alert
        variant="warning"
        title="Unsaved changes"
        onClose={() => {
          setOpen(false);
        }}
      >
        Leave this page and your edits will be lost.
      </Alert>
    );
  },
};

export const WithoutIcon: AlertStory = {
  args: {
    icon: false,
    variant: 'success',
    title: 'Uploaded',
    children: 'Your file is ready.',
  },
  render: (args) => <Alert {...args} />,
};
