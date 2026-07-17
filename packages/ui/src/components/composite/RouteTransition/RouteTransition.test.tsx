import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { RouteTransitionOverlay } from './RouteTransitionOverlay';

const getOverlay = (): HTMLElement => {
  const overlay = document.body.querySelector('[aria-busy]');
  if (!(overlay instanceof HTMLElement)) {
    throw new Error('Route transition overlay not found');
  }

  return overlay;
};

describe('RouteTransitionOverlay', () => {
  it('renders the loading indicator and visual message when visible', () => {
    render(<RouteTransitionOverlay visible message="Hang in there sailor" />);
    expect(screen.getByRole('status', { name: 'Hang in there sailor' })).toBeInTheDocument();
    expect(screen.getByText('Hang in there sailor')).toBeInTheDocument();
  });

  it('supports a custom message', () => {
    render(<RouteTransitionOverlay visible message="Loading route" />);
    expect(screen.getByRole('status', { name: 'Loading route' })).toBeInTheDocument();
    expect(screen.getByText('Loading route')).toHaveAttribute('aria-hidden', 'true');
  });

  it('applies direction-specific hidden classes when not visible', () => {
    const { rerender } = render(
      <RouteTransitionOverlay visible={false} direction="left" message="Loading" />,
    );
    expect(getOverlay()).toHaveClass('-translate-x-full');

    rerender(<RouteTransitionOverlay visible={false} direction="top" message="Loading" />);
    expect(getOverlay()).toHaveClass('-translate-y-full');
  });

  it('applies backdrop blur when blurBackdrop is true', () => {
    render(<RouteTransitionOverlay visible blurBackdrop message="Loading" />);
    expect(document.body.querySelector('.backdrop-blur-md')).toBeInTheDocument();
  });

  it('locks the document body while visible', () => {
    const { rerender } = render(<RouteTransitionOverlay visible message="Loading" />);
    expect(document.body).toHaveAttribute('data-route-transition-active', 'true');

    rerender(<RouteTransitionOverlay visible={false} message="Loading" />);
    expect(document.body).not.toHaveAttribute('data-route-transition-active');
  });

  it('renders a solid full-screen backdrop layer', () => {
    render(<RouteTransitionOverlay visible message="Loading" />);
    expect(getOverlay().querySelector('.bg-background')).toBeInTheDocument();
  });

  it('covers the full viewport with a fixed root layer', () => {
    render(<RouteTransitionOverlay visible message="Loading" />);
    const overlay = getOverlay();

    expect(overlay).toHaveClass('fixed', 'inset-0', 'min-h-dvh', 'w-full');
    expect(overlay.className).toContain('z-[var(--z-route-transition)]');
  });
});
