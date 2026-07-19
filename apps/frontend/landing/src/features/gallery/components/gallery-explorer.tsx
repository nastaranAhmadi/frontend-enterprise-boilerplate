'use client';

import { InfiniteList } from '@enterprise/ui';
import { Skeleton } from '@enterprise/ui/skeleton';
import { useMemo, useState } from 'react';

import type { Locale } from '@/config/site';
import { GalleryCategoryTabs } from '@/features/gallery/components/gallery-category-tabs';
import { GalleryTile } from '@/features/gallery/components/gallery-tile';
import {
  GalleryToolbar,
  type GalleryToolbarLabels,
} from '@/features/gallery/components/gallery-toolbar';
import { GALLERY_QUILT_LIST_CLASS_NAME } from '@/features/gallery/gallery-quilt';
import { useGalleryFeed } from '@/features/gallery/hooks/use-gallery-feed';
import type {
  GalleryCategory,
  GalleryItem,
  GalleryPeriod,
  GallerySort,
} from '@/repositories/gallery/gallery.types';

export type GalleryExplorerLabels = GalleryToolbarLabels & {
  resultCount: string;
  empty: string;
  error: string;
  loadingMore: string;
  end: string;
  follow: string;
  following: string;
  orders: string;
  gridLabel: string;
};

type GalleryExplorerProps = {
  locale: Locale;
  labels: GalleryExplorerLabels;
};

const GalleryGridSkeleton = () => (
  <div className={GALLERY_QUILT_LIST_CLASS_NAME} aria-hidden="true">
    <Skeleton
      variant="rectangular"
      className="col-span-2 row-span-2 h-full min-h-[192px] w-full rounded-none sm:min-h-[220px] lg:min-h-[242px]"
    />
    <Skeleton
      variant="rectangular"
      className="col-span-1 row-span-1 h-full min-h-[96px] w-full rounded-none"
    />
    <Skeleton
      variant="rectangular"
      className="col-span-1 row-span-1 h-full min-h-[96px] w-full rounded-none"
    />
    <Skeleton
      variant="rectangular"
      className="col-span-2 row-span-1 h-full min-h-[96px] w-full rounded-none"
    />
    <Skeleton
      variant="rectangular"
      className="col-span-1 row-span-2 h-full min-h-[192px] w-full rounded-none"
    />
    <Skeleton
      variant="rectangular"
      className="col-span-1 row-span-1 h-full min-h-[96px] w-full rounded-none"
    />
  </div>
);

export const GalleryExplorer = ({ locale, labels }: GalleryExplorerProps) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<GalleryCategory | 'all'>('all');
  const [period, setPeriod] = useState<GalleryPeriod>('any');
  const [sort, setSort] = useState<GallerySort>('newest');
  const [followedIds, setFollowedIds] = useState<Set<string>>(() => new Set());

  const feed = useGalleryFeed(locale, { q: query, category, period, sort });

  const items = useMemo(
    () => feed.data?.pages.flatMap((page) => page.items) ?? [],
    [feed.data?.pages],
  );

  const total = feed.data?.pages[0]?.total ?? 0;
  const isInitialLoading = feed.isLoading && items.length === 0;
  const isFetchingNext = feed.isFetchingNextPage;

  const toggleFollow = (id: string) => {
    setFollowedIds((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="flex w-full min-w-0 flex-col gap-lg">
      <GalleryToolbar
        query={query}
        period={period}
        sort={sort}
        labels={labels}
        onQueryChange={setQuery}
        onPeriodChange={setPeriod}
        onSortChange={setSort}
      />

      <div className="flex min-w-0 flex-col gap-md">
        <div className="flex min-w-0 flex-col gap-sm sm:flex-row sm:items-end sm:justify-between">
          <GalleryCategoryTabs
            category={category}
            categoryAll={labels.categoryAll}
            categoryLabel={labels.categoryLabel}
            categories={labels.categories}
            onCategoryChange={setCategory}
          />
          {!isInitialLoading && !feed.isError ? (
            <p className="shrink-0 text-sm text-muted-foreground" aria-live="polite">
              {labels.resultCount.replace('{count}', String(total))}
            </p>
          ) : null}
        </div>

        <div className="min-w-[18rem] overflow-hidden rounded-md border border-border bg-border">
          {isInitialLoading ? <GalleryGridSkeleton /> : null}

          {!isInitialLoading ? (
            <InfiniteList<GalleryItem>
              items={items}
              aria-label={labels.gridLabel}
              loading={isFetchingNext || (feed.isFetching && items.length === 0)}
              hasMore={feed.hasNextPage}
              onLoadMore={() => {
                if (!feed.isFetchingNextPage && feed.hasNextPage) {
                  void feed.fetchNextPage();
                }
              }}
              getItemKey={(item) => item.id}
              className="gap-0"
              listClassName={GALLERY_QUILT_LIST_CLASS_NAME}
              itemClassName="!contents"
              emptyState={
                <div className="col-span-full bg-background px-md py-2xl text-center text-muted-foreground">
                  {labels.empty}
                </div>
              }
              error={feed.isError ? labels.error : undefined}
              onRetry={() => {
                void feed.refetch();
              }}
              endMessage={labels.end}
              loader={
                <p className="bg-background py-md text-center text-sm text-muted-foreground">
                  {labels.loadingMore}
                </p>
              }
              renderItem={(item) => (
                <GalleryTile
                  item={item}
                  locale={locale}
                  labels={labels}
                  followed={followedIds.has(item.id)}
                  onFollowToggle={toggleFollow}
                />
              )}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};
