import { type ComponentProps, type ReactElement, useState } from 'react';

import { Button } from '../../base/Button';
import { Modal } from './Modal';

const meta = {
  title: 'Composite/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'Accessible dialog overlay with focus management, backdrop dismissal, and footer actions.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large', 'full'],
    },
    closeOnBackdropClick: { control: 'boolean' },
    closeOnEscape: { control: 'boolean' },
    className: { control: false },
    contentClassName: { control: false },
    footer: { control: false },
    onClose: { control: false },
  },
  args: {
    open: true,
    size: 'medium',
    closeOnBackdropClick: true,
    closeOnEscape: true,
  },
};

export default meta;

type ModalStory = {
  args?: Partial<ComponentProps<typeof Modal>>;
  render?: (args: Partial<ComponentProps<typeof Modal>>) => ReactElement;
};

const ModalDemo = (args: Partial<ComponentProps<typeof Modal>>) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        Open modal
      </Button>
      <Modal
        {...args}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        title={args.title ?? 'Invite teammate'}
        description={args.description ?? 'Send an invitation to collaborate on this workspace.'}
        footer={
          <div style={{ display: 'flex', gap: 8 }}>
            <Button
              variant="outlined"
              onClick={() => {
                setOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                setOpen(false);
              }}
            >
              Send invite
            </Button>
          </div>
        }
      >
        {args.children ?? 'Choose a role and permissions before sending the invite.'}
      </Modal>
    </>
  );
};

export const Playground: ModalStory = {
  render: (args) => <ModalDemo {...args} />,
};

export const Sizes: ModalStory = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <ModalDemo size="small" title="Small modal" />
      <ModalDemo size="medium" title="Medium modal" />
      <ModalDemo size="large" title="Large modal" />
    </div>
  ),
};

export const OpenByDefault: ModalStory = {
  args: {
    open: true,
    title: 'Delete project',
    description: 'This action cannot be undone.',
    children: 'All environments and deployments will be removed permanently.',
    footer: (
      <div style={{ display: 'flex', gap: 8 }}>
        <Button variant="outlined">Cancel</Button>
        <Button color="error">Delete</Button>
      </div>
    ),
    onClose: () => undefined,
  },
};
