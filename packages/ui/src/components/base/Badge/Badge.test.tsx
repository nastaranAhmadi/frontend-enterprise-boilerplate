import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it } from 'vitest';

import { Badge } from './Badge';
import { formatBadgeContent, isBadgeVisible } from './Badge.styles';

const MailIcon = () => (
  <svg data-testid="mail-icon" aria-hidden="true" viewBox="0 0 24 24" width={24} height={24}>
    <path d="M4 6h16v12H4z" />
  </svg>
);

describe('Badge', () => {
  it('renders wrapped children with badge content', () => {
    render(
      <Badge badgeContent={4} color="primary">
        <MailIcon />
      </Badge>,
    );

    expect(screen.getByTestId('mail-icon')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
  });

  it('hides badge content when count is zero by default', () => {
    render(
      <Badge badgeContent={0} color="secondary">
        <MailIcon />
      </Badge>,
    );

    expect(screen.queryByText('0')).not.toBeInTheDocument();
  });

  it('shows zero when showZero is enabled', () => {
    render(
      <Badge badgeContent={0} showZero color="secondary">
        <MailIcon />
      </Badge>,
    );

    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('caps numeric content with max', () => {
    expect(formatBadgeContent(100, 99)).toBe('99+');
    expect(formatBadgeContent(12, 99)).toBe(12);
  });

  it('renders dot variant without numeric content', () => {
    render(
      <Badge variant="dot" color="secondary">
        <MailIcon />
      </Badge>,
    );

    expect(screen.getByTestId('mail-icon')).toBeInTheDocument();
    expect(screen.queryByText('0')).not.toBeInTheDocument();
    expect(document.querySelector('[aria-hidden="true"].rounded-full')).toBeInTheDocument();
  });

  it('respects invisible prop', () => {
    render(
      <Badge badgeContent={4} invisible>
        <MailIcon />
      </Badge>,
    );

    expect(screen.queryByText('4')).not.toBeInTheDocument();
  });

  it('applies color classes to the indicator', () => {
    render(
      <Badge badgeContent={2} color="success">
        <MailIcon />
      </Badge>,
    );

    expect(screen.getByText('2')).toHaveClass('bg-success');
  });

  it('applies badgeAriaLabel to icon-only children', () => {
    render(
      <Badge badgeContent={4} badgeAriaLabel="4 unread messages" color="secondary">
        <MailIcon />
      </Badge>,
    );

    expect(screen.getByLabelText('4 unread messages')).toBeInTheDocument();
  });

  it('falls back to numeric badge content when the child has no accessible name', () => {
    render(
      <Badge badgeContent={4} color="secondary">
        <MailIcon />
      </Badge>,
    );

    expect(screen.getByLabelText('4')).toBeInTheDocument();
  });

  it('does not override an existing child aria-label', () => {
    render(
      <Badge badgeContent={4} color="secondary">
        <button type="button" aria-label="Inbox">
          <MailIcon />
        </button>
      </Badge>,
    );

    expect(screen.getByRole('button', { name: 'Inbox' })).toBeInTheDocument();
  });

  it('forwards ref to the root element', () => {
    const ref = createRef<HTMLSpanElement>();

    render(
      <Badge ref={ref} badgeContent={1}>
        <MailIcon />
      </Badge>,
    );

    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });
});

describe('isBadgeVisible', () => {
  it('returns false for empty standard badge content', () => {
    expect(
      isBadgeVisible({
        badgeContent: undefined,
        variant: 'standard',
        showZero: false,
        invisible: false,
      }),
    ).toBe(false);
  });

  it('returns true for dot variant without content', () => {
    expect(
      isBadgeVisible({
        badgeContent: undefined,
        variant: 'dot',
        showZero: false,
        invisible: false,
      }),
    ).toBe(true);
  });
});
