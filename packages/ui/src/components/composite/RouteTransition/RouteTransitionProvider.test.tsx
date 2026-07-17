import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { RouteTransitionProvider } from './RouteTransitionProvider';

const getOverlay = (): HTMLElement => {
  const overlay = document.body.querySelector('[aria-busy]');
  if (!(overlay instanceof HTMLElement)) {
    throw new Error('Route transition overlay not found');
  }

  return overlay;
};

describe('RouteTransitionProvider', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    window.history.replaceState({}, '', '/home');
  });

  afterEach(() => {
    vi.useRealTimers();
    cleanup();
  });

  it('renders children', () => {
    render(
      <RouteTransitionProvider pathname="/home" message="Loading">
        <span>page content</span>
      </RouteTransitionProvider>,
    );

    expect(screen.getByText('page content')).toBeInTheDocument();
  });

  it('does not mount the overlay portal when disabled', () => {
    render(
      <RouteTransitionProvider pathname="/home" message="Loading" enabled={false}>
        <span>page content</span>
      </RouteTransitionProvider>,
    );

    expect(document.body.querySelector('[aria-busy]')).toBeNull();
  });

  it('keeps the portal mounted while enabled and hidden', () => {
    render(
      <RouteTransitionProvider pathname="/home" message="Loading">
        <span>page content</span>
      </RouteTransitionProvider>,
    );

    const overlay = getOverlay();
    expect(overlay).toHaveAttribute('aria-hidden', 'true');
    expect(overlay).toHaveClass('pointer-events-none');
  });

  it('shows the overlay on pathname change and hides after minDuration', () => {
    const { rerender } = render(
      <RouteTransitionProvider pathname="/home" message="Loading page" minDuration={300}>
        <span>page content</span>
      </RouteTransitionProvider>,
    );

    rerender(
      <RouteTransitionProvider pathname="/about" message="Loading page" minDuration={300}>
        <span>page content</span>
      </RouteTransitionProvider>,
    );

    expect(screen.getByRole('status', { name: 'Loading page' })).toBeInTheDocument();
    expect(getOverlay()).toHaveAttribute('aria-busy', 'true');

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(getOverlay()).toHaveAttribute('aria-hidden', 'true');
  });

  it('forwards blurBackdrop to the overlay', () => {
    render(
      <RouteTransitionProvider pathname="/home" message="Loading" blurBackdrop>
        <span>page content</span>
      </RouteTransitionProvider>,
    );

    expect(document.body.querySelector('.backdrop-blur-md')).toBeInTheDocument();
  });

  it('shows the overlay on internal link click before pathname changes', () => {
    render(
      <RouteTransitionProvider pathname="/home" message="Loading">
        <a href="/about">About</a>
      </RouteTransitionProvider>,
    );

    act(() => {
      fireEvent.click(screen.getByRole('link', { name: 'About' }));
    });

    expect(getOverlay()).toHaveAttribute('aria-busy', 'true');
  });
});
