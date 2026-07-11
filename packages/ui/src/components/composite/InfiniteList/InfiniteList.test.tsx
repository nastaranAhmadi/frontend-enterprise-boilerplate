import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { Card, CardContent, CardTitle } from '../Card';
import { InfiniteList } from './InfiniteList';

let intersectionCallback: IntersectionObserverCallback | undefined;

const createIntersectionEntry = (isIntersecting: boolean): IntersectionObserverEntry => ({
  isIntersecting,
  boundingClientRect: {} as DOMRectReadOnly,
  intersectionRatio: isIntersecting ? 1 : 0,
  intersectionRect: {} as DOMRectReadOnly,
  rootBounds: null,
  target: document.createElement('div'),
  time: Date.now(),
});

class MockIntersectionObserver {
  constructor(callback: IntersectionObserverCallback) {
    intersectionCallback = callback;
  }

  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
}

const triggerIntersection = (isIntersecting: boolean) => {
  intersectionCallback?.([createIntersectionEntry(isIntersecting)], {} as IntersectionObserver);
};

describe('InfiniteList', () => {
  beforeEach(() => {
    intersectionCallback = undefined;
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders items with a render prop', () => {
    render(
      <InfiniteList
        items={['Alpha', 'Beta']}
        renderItem={(item) => <span>{item}</span>}
        aria-label="Messages"
      />,
    );

    expect(screen.getByRole('list', { name: 'Messages' })).toBeInTheDocument();
    expect(screen.getByText('Alpha')).toBeInTheDocument();
    expect(screen.getByText('Beta')).toBeInTheDocument();
  });

  it('renders an empty state', () => {
    render(
      <InfiniteList
        items={[]}
        emptyState="Nothing here yet."
        renderItem={(item: string) => <span>{item}</span>}
      />,
    );

    expect(screen.getByText('Nothing here yet.')).toBeInTheDocument();
  });

  it('renders an error state with retry', async () => {
    const user = userEvent.setup();
    const onRetry = vi.fn();

    render(
      <InfiniteList
        items={[]}
        error="Failed to load items."
        onRetry={onRetry}
        renderItem={(item: string) => <span>{item}</span>}
      />,
    );

    expect(screen.getByRole('alert')).toHaveTextContent('Failed to load items.');
    await user.click(screen.getByRole('button', { name: 'Retry' }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('keeps existing items visible when an error is shown', () => {
    render(
      <InfiniteList
        items={['Alpha']}
        error="Failed to refresh."
        renderItem={(item) => <span>{item}</span>}
      />,
    );

    expect(screen.getByRole('alert')).toHaveTextContent('Failed to refresh.');
    expect(screen.getByText('Alpha')).toBeInTheDocument();
  });

  it('renders the end message when there is no more data', () => {
    render(
      <InfiniteList
        items={['Alpha']}
        hasMore={false}
        endMessage="All caught up."
        renderItem={(item) => <span>{item}</span>}
      />,
    );

    expect(screen.getByText('All caught up.')).toBeInTheDocument();
  });

  it('sets aria-busy while loading', () => {
    const { container } = render(
      <InfiniteList items={['Alpha']} loading hasMore renderItem={(item) => <span>{item}</span>} />,
    );

    expect(container.firstChild).toHaveAttribute('aria-busy', 'true');
  });

  it('calls onLoadMore when the sentinel intersects', () => {
    const onLoadMore = vi.fn();

    render(
      <InfiniteList
        items={['Alpha']}
        hasMore
        onLoadMore={onLoadMore}
        renderItem={(item) => <span>{item}</span>}
      />,
    );

    triggerIntersection(true);
    expect(onLoadMore).toHaveBeenCalledTimes(1);
  });

  it('does not call onLoadMore again until loading completes', () => {
    const onLoadMore = vi.fn();

    const { rerender } = render(
      <InfiniteList
        items={['Alpha']}
        hasMore
        onLoadMore={onLoadMore}
        renderItem={(item) => <span>{item}</span>}
      />,
    );

    triggerIntersection(true);
    triggerIntersection(true);
    expect(onLoadMore).toHaveBeenCalledTimes(1);

    rerender(
      <InfiniteList
        items={['Alpha']}
        hasMore
        loading
        onLoadMore={onLoadMore}
        renderItem={(item) => <span>{item}</span>}
      />,
    );

    rerender(
      <InfiniteList
        items={['Alpha', 'Beta']}
        hasMore
        onLoadMore={onLoadMore}
        renderItem={(item) => <span>{item}</span>}
      />,
    );

    triggerIntersection(true);
    expect(onLoadMore).toHaveBeenCalledTimes(2);
  });

  it('works with arbitrary item shapes', () => {
    render(
      <InfiniteList
        items={[{ id: 1, title: 'Design systems' }]}
        getItemKey={(item) => item.id}
        renderItem={(item) => (
          <Card>
            <CardTitle>{item.title}</CardTitle>
            <CardContent>Reusable primitives.</CardContent>
          </Card>
        )}
      />,
    );

    expect(screen.getByText('Design systems')).toBeInTheDocument();
  });
});
