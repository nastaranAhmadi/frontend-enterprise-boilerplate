import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Button } from '../../base/Button';
import { Toast, ToastProvider, useToast } from './Toast';

describe('Toast', () => {
  it('renders title and description when open', () => {
    render(
      <Toast
        open
        title="Changes saved"
        description="Your profile was updated."
        onClose={() => undefined}
      />,
    );

    expect(screen.getByRole('status')).toHaveTextContent('Changes saved');
    expect(screen.getByText('Your profile was updated.')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(<Toast open={false} title="Hidden" onClose={() => undefined} />);
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('uses alert semantics for error variant', () => {
    render(<Toast open variant="error" title="Failed to save" onClose={() => undefined} />);
    expect(screen.getByRole('alert')).toHaveTextContent('Failed to save');
  });

  it('calls onClose when dismiss is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(<Toast open title="Saved" onClose={onClose} />);
    await user.click(screen.getByRole('button', { name: 'Dismiss notification' }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('auto dismisses after duration', () => {
    vi.useFakeTimers();
    const onClose = vi.fn();

    render(<Toast open title="Saved" duration={3000} onClose={onClose} />);

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(onClose).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });
});

const ToastDemo = () => {
  const { toast } = useToast();

  return (
    <Button
      onClick={() => {
        toast({
          title: 'Invite sent',
          description: 'Your teammate will receive an email shortly.',
        });
      }}
    >
      Show toast
    </Button>
  );
};

describe('ToastProvider', () => {
  it('shows and dismisses toasts through useToast', async () => {
    const user = userEvent.setup();

    render(
      <ToastProvider>
        <ToastDemo />
      </ToastProvider>,
    );

    expect(screen.queryByRole('status')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Show toast' }));
    expect(screen.getByRole('status')).toHaveTextContent('Invite sent');

    await user.click(screen.getByRole('button', { name: 'Dismiss notification' }));
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('throws when useToast is used outside the provider', () => {
    const Broken = () => {
      useToast();
      return null;
    };

    expect(() => render(<Broken />)).toThrow('useToast must be used within ToastProvider.');
  });

  it('renders viewport with logical inset utilities in rtl', async () => {
    const user = userEvent.setup();

    render(
      <div dir="rtl" lang="fa">
        <ToastProvider position="top-end">
          <ToastDemo />
        </ToastProvider>
      </div>,
    );

    await user.click(screen.getByRole('button', { name: 'Show toast' }));

    const viewport = document.body.querySelector('[class*="z-toast"]');
    expect(viewport?.className).toContain('end-md');
    expect(viewport?.className).not.toContain('right-md');
  });
});
