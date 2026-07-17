import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useRouteTransition } from './useRouteTransition';

const TransitionProbe = ({
  pathname,
  enabled = true,
  minDuration = 300,
}: {
  enabled?: boolean;
  minDuration?: number;
  pathname: string;
}) => {
  const visible = useRouteTransition(pathname, { enabled, minDuration });
  return <div data-testid="visible">{visible ? 'yes' : 'no'}</div>;
};

const clickAnchor = (anchor: HTMLAnchorElement) => {
  act(() => {
    fireEvent.click(anchor);
  });
};

describe('useRouteTransition', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    window.history.replaceState({}, '', '/home');
  });

  afterEach(() => {
    vi.useRealTimers();
    document.body.replaceChildren();
  });

  it('shows and hides when pathname changes', () => {
    const { rerender } = render(<TransitionProbe pathname="/home" />);
    expect(screen.getByTestId('visible')).toHaveTextContent('no');

    rerender(<TransitionProbe pathname="/about" />);
    expect(screen.getByTestId('visible')).toHaveTextContent('yes');

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(screen.getByTestId('visible')).toHaveTextContent('no');
  });

  it('shows on internal link click before pathname changes', () => {
    render(<TransitionProbe pathname="/home" />);

    const link = document.createElement('a');
    link.href = '/about';
    document.body.appendChild(link);

    clickAnchor(link);
    expect(screen.getByTestId('visible')).toHaveTextContent('yes');
  });

  it('ignores external links', () => {
    render(<TransitionProbe pathname="/home" />);

    const link = document.createElement('a');
    link.href = 'https://example.com/about';
    document.body.appendChild(link);

    clickAnchor(link);
    expect(screen.getByTestId('visible')).toHaveTextContent('no');
  });

  it('ignores hash links', () => {
    render(<TransitionProbe pathname="/home" />);

    const link = document.createElement('a');
    link.href = '#section';
    document.body.appendChild(link);

    clickAnchor(link);
    expect(screen.getByTestId('visible')).toHaveTextContent('no');
  });

  it('ignores target="_blank" links', () => {
    render(<TransitionProbe pathname="/home" />);

    const link = document.createElement('a');
    link.href = '/about';
    link.target = '_blank';
    document.body.appendChild(link);

    clickAnchor(link);
    expect(screen.getByTestId('visible')).toHaveTextContent('no');
  });

  it('ignores same-path clicks', () => {
    render(<TransitionProbe pathname="/home" />);

    const link = document.createElement('a');
    link.href = '/home';
    document.body.appendChild(link);

    clickAnchor(link);
    expect(screen.getByTestId('visible')).toHaveTextContent('no');
  });

  it('extends visibility when pathname changes again before minDuration elapses', () => {
    const { rerender } = render(<TransitionProbe pathname="/home" minDuration={300} />);

    rerender(<TransitionProbe pathname="/about" minDuration={300} />);
    expect(screen.getByTestId('visible')).toHaveTextContent('yes');

    act(() => {
      vi.advanceTimersByTime(150);
    });

    rerender(<TransitionProbe pathname="/contact" minDuration={300} />);
    expect(screen.getByTestId('visible')).toHaveTextContent('yes');

    act(() => {
      vi.advanceTimersByTime(150);
    });
    expect(screen.getByTestId('visible')).toHaveTextContent('yes');

    act(() => {
      vi.advanceTimersByTime(150);
    });
    expect(screen.getByTestId('visible')).toHaveTextContent('no');
  });

  it('returns false and skips listeners when disabled', () => {
    render(<TransitionProbe pathname="/home" enabled={false} />);

    const link = document.createElement('a');
    link.href = '/about';
    document.body.appendChild(link);

    clickAnchor(link);
    expect(screen.getByTestId('visible')).toHaveTextContent('no');
  });
});
