import { useEffect, useRef } from 'react';

import { Button } from '../../base/Button';
import { ErrorMessage } from '../../base/ErrorMessage';
import { HelperText } from '../../base/HelperText';
import {
  getInfiniteListEndClassName,
  getInfiniteListItemClassName,
  getInfiniteListItemsClassName,
  getInfiniteListLoaderClassName,
  getInfiniteListRootClassName,
  getInfiniteListStatusClassName,
  INFINITE_LIST_SENTINEL_CLASS,
} from './InfiniteList.styles';
import type { InfiniteListProps } from './InfiniteList.types';

const DEFAULT_LOAD_MORE_ROOT_MARGIN = '120px';

const DefaultLoader = ({ size }: { size?: InfiniteListProps<unknown>['size'] }) => (
  <div className={getInfiniteListLoaderClassName({ size })} aria-live="polite">
    Loading more…
  </div>
);

export const InfiniteList = function InfiniteList<T>(props: InfiniteListProps<T>) {
  const {
    items,
    renderItem,
    loading = false,
    hasMore = false,
    onLoadMore,
    loadMoreRootMargin = DEFAULT_LOAD_MORE_ROOT_MARGIN,
    loader,
    endMessage = 'You have reached the end.',
    emptyState = 'No items to display.',
    error,
    onRetry,
    size,
    className,
    itemClassName,
    listClassName,
    getItemKey,
    'aria-label': ariaLabel,
    ...infiniteListProps
  } = props;

  const sentinelRef = useRef<HTMLDivElement>(null);
  const loadRequestedRef = useRef(false);
  const hasItems = items.length > 0;
  const showEmptyState = !hasItems && !loading && !error;
  const showEndMessage = hasItems && !loading && !hasMore && !error;
  const showLoader = loading && hasItems;
  const showInitialLoader = loading && !hasItems && !error;

  useEffect(() => {
    if (!loading) {
      loadRequestedRef.current = false;
    }
  }, [loading]);

  useEffect(() => {
    if (!hasMore || loading || !onLoadMore || error) return;

    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !loadRequestedRef.current) {
          loadRequestedRef.current = true;
          onLoadMore();
        }
      },
      { rootMargin: loadMoreRootMargin },
    );

    observer.observe(sentinel);
    return () => {
      observer.disconnect();
    };
  }, [error, hasMore, loadMoreRootMargin, loading, onLoadMore, items.length]);

  return (
    <div
      {...infiniteListProps}
      className={getInfiniteListRootClassName({ size, className })}
      aria-busy={loading || undefined}
    >
      {showEmptyState ? (
        <div className={getInfiniteListStatusClassName({ size })} role="status">
          {emptyState}
        </div>
      ) : null}

      {error ? (
        <div className={getInfiniteListStatusClassName({ size, tone: 'error' })}>
          <ErrorMessage size={size}>{error}</ErrorMessage>
          {onRetry ? (
            <Button size={size} variant="outlined" onClick={onRetry}>
              Retry
            </Button>
          ) : null}
        </div>
      ) : null}

      {showInitialLoader ? (loader ?? <DefaultLoader size={size} />) : null}

      {hasItems ? (
        <div
          role="list"
          aria-label={ariaLabel}
          className={getInfiniteListItemsClassName({ size, className: listClassName })}
        >
          {items.map((item, index) => (
            <div
              key={getItemKey ? getItemKey(item, index) : index}
              role="listitem"
              className={getInfiniteListItemClassName({ className: itemClassName })}
            >
              {renderItem(item, index)}
            </div>
          ))}
        </div>
      ) : null}

      {showLoader ? (loader ?? <DefaultLoader size={size} />) : null}

      {showEndMessage ? (
        <div className={getInfiniteListEndClassName({ size })} role="status">
          <HelperText size={size}>{endMessage}</HelperText>
        </div>
      ) : null}

      {hasMore && !error ? (
        <div ref={sentinelRef} className={INFINITE_LIST_SENTINEL_CLASS} aria-hidden="true" />
      ) : null}
    </div>
  );
};

InfiniteList.displayName = 'InfiniteList';
