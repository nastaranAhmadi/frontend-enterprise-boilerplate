import type { ComponentProps, ReactElement } from 'react';
import { useState } from 'react';

import { Button } from '../../base/Button';
import { Toast, ToastProvider, useToast } from './Toast';
import type { ToastPosition, ToastVariant } from './Toast.types';

const meta = {
  title: 'Composite/Toast',
  component: Toast,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'Transient notifications with variants, auto-dismiss, and a ToastProvider/useToast API for imperative toasts.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'error', 'warning', 'info'],
    },
    dismissible: { control: 'boolean' },
    duration: { control: { type: 'number', min: 0, step: 500 } },
    className: { control: false },
    action: { control: false },
    onClose: { control: false },
  },
  args: {
    open: true,
    title: 'Changes saved',
    description: 'Your profile settings were updated successfully.',
    variant: 'success',
    dismissible: true,
    duration: 5000,
  },
  decorators: [
    (Story: () => ReactElement) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type ToastStory = {
  args?: Partial<ComponentProps<typeof Toast>>;
  render?: () => ReactElement;
};

export const Playground: ToastStory = {
  render: () => (
    <Toast
      open
      title="Changes saved"
      description="Your profile settings were updated successfully."
      variant="success"
      onClose={() => undefined}
    />
  ),
};

export const Variants: ToastStory = {
  render: () => {
    const variants: ToastVariant[] = ['default', 'success', 'error', 'warning', 'info'];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {variants.map((variant) => (
          <Toast
            key={variant}
            open
            variant={variant}
            title={`${variant.charAt(0).toUpperCase()}${variant.slice(1)} toast`}
            description="Supporting message for this notification."
            onClose={() => undefined}
          />
        ))}
      </div>
    );
  },
};

const ProviderDemo = () => {
  const { toast } = useToast();

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      <Button
        onClick={() => {
          toast({
            title: 'Saved',
            description: 'Draft saved to your workspace.',
            variant: 'success',
          });
        }}
      >
        Success
      </Button>
      <Button
        variant="outlined"
        color="error"
        onClick={() => {
          toast({
            title: 'Upload failed',
            description: 'Try again in a few minutes.',
            variant: 'error',
          });
        }}
      >
        Error
      </Button>
      <Button
        variant="outlined"
        onClick={() => {
          toast({
            title: 'Update available',
            description: 'Refresh to load the latest version.',
            variant: 'info',
            action: <Button size="small">Refresh</Button>,
          });
        }}
      >
        With action
      </Button>
    </div>
  );
};

const ToastProviderDemo = ({ position = 'top-end' }: { position?: ToastPosition }) => (
  <ToastProvider position={position}>
    <ProviderDemo />
  </ToastProvider>
);

export const WithProvider: ToastStory = {
  render: () => <ToastProviderDemo />,
};

export const BottomEnd: ToastStory = {
  render: () => <ToastProviderDemo position="bottom-end" />,
};

export const Controlled: ToastStory = {
  render: () => {
    const ControlledDemo = () => {
      const [open, setOpen] = useState(false);

      return (
        <>
          <Button
            onClick={() => {
              setOpen(true);
            }}
          >
            Show controlled toast
          </Button>
          <Toast
            open={open}
            title="Controlled toast"
            description="Dismiss manually or wait for auto-dismiss."
            variant="info"
            onClose={() => {
              setOpen(false);
            }}
          />
        </>
      );
    };

    return <ControlledDemo />;
  },
};
