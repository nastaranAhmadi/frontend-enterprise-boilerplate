import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { BottomSheet } from './BottomSheet';

describe('BottomSheet', () => {
  it('renders dialog content when open', () => {
    render(
      <BottomSheet open onClose={() => undefined} title="Filters" description="Refine results">
        Sheet content
      </BottomSheet>,
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Filters')).toBeInTheDocument();
    expect(screen.getByText('Sheet content')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(
      <BottomSheet open={false} onClose={() => undefined} title="Hidden">
        Sheet content
      </BottomSheet>,
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('calls onClose when Escape is pressed', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <BottomSheet open onClose={onClose} title="Filters">
        Sheet content
      </BottomSheet>,
    );

    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('moves focus to the first focusable element when opened', () => {
    render(
      <BottomSheet
        open
        onClose={() => undefined}
        title="Filters"
        footer={<button type="button">Apply</button>}
      >
        <button type="button">Reset</button>
      </BottomSheet>,
    );

    expect(screen.getByRole('button', { name: 'Reset' })).toHaveFocus();
  });

  it('traps focus inside the sheet when tabbing', async () => {
    const user = userEvent.setup();

    render(
      <BottomSheet
        open
        onClose={() => undefined}
        title="Filters"
        footer={<button type="button">Apply</button>}
      >
        <button type="button">Reset</button>
      </BottomSheet>,
    );

    const reset = screen.getByRole('button', { name: 'Reset' });
    const apply = screen.getByRole('button', { name: 'Apply' });

    expect(reset).toHaveFocus();

    await user.tab();
    expect(apply).toHaveFocus();

    await user.tab();
    expect(reset).toHaveFocus();
  });
});
