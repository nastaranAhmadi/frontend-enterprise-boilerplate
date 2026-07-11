import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Button } from '../../base/Button';
import { Modal } from './Modal';

describe('Modal', () => {
  it('renders dialog content when open', () => {
    render(
      <Modal open onClose={() => undefined} title="Confirm action" description="Are you sure?">
        Body content
      </Modal>,
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Confirm action')).toBeInTheDocument();
    expect(screen.getByText('Are you sure?')).toBeInTheDocument();
    expect(screen.getByText('Body content')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(
      <Modal open={false} onClose={() => undefined} title="Hidden">
        Body content
      </Modal>,
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('calls onClose when Escape is pressed', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <Modal open onClose={onClose} title="Confirm action">
        Body content
      </Modal>,
    );

    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('renders footer actions', () => {
    render(
      <Modal open onClose={() => undefined} title="Confirm action" footer={<Button>Save</Button>}>
        Body content
      </Modal>,
    );

    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
  });

  it('moves focus to the first focusable element when opened', () => {
    render(
      <Modal open onClose={() => undefined} title="Confirm action" footer={<Button>Save</Button>}>
        <Button>Body action</Button>
      </Modal>,
    );

    expect(screen.getByRole('button', { name: 'Body action' })).toHaveFocus();
  });

  it('traps focus inside the dialog when tabbing', async () => {
    const user = userEvent.setup();

    render(
      <Modal
        open
        onClose={() => undefined}
        title="Confirm action"
        footer={
          <>
            <Button>Cancel</Button>
            <Button>Save</Button>
          </>
        }
      >
        <Button>Body action</Button>
      </Modal>,
    );

    const bodyAction = screen.getByRole('button', { name: 'Body action' });
    const cancel = screen.getByRole('button', { name: 'Cancel' });
    const save = screen.getByRole('button', { name: 'Save' });

    expect(bodyAction).toHaveFocus();

    await user.tab();
    expect(cancel).toHaveFocus();

    await user.tab();
    expect(save).toHaveFocus();

    await user.tab();
    expect(bodyAction).toHaveFocus();
  });

  it('traps focus inside the dialog when tabbing in rtl', async () => {
    const user = userEvent.setup();

    render(
      <div dir="rtl" lang="fa">
        <Modal
          open
          onClose={() => undefined}
          title="تأیید عملیات"
          footer={
            <>
              <Button>لغو</Button>
              <Button>ذخیره</Button>
            </>
          }
        >
          <Button>اقدام</Button>
        </Modal>
      </div>,
    );

    const bodyAction = screen.getByRole('button', { name: 'اقدام' });
    const cancel = screen.getByRole('button', { name: 'لغو' });
    const save = screen.getByRole('button', { name: 'ذخیره' });

    expect(bodyAction).toHaveFocus();

    await user.tab();
    expect(cancel).toHaveFocus();

    await user.tab();
    expect(save).toHaveFocus();

    await user.tab();
    expect(bodyAction).toHaveFocus();
  });
});
