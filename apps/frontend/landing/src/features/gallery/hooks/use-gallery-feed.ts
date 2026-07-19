'use client';

import { useDebouncedValue } from '@enterprise/hooks';
import { useInfiniteQuery } from '@tanstack/react-query';

import type { Locale } from '@/config/site';
import { searchGalleryRequest } from '@/lib/api/search-gallery-client';
import type {
  GalleryCategory,
  GalleryPeriod,
  GallerySort,
} from '@/repositories/gallery/gallery.types';

const SEARCH_DEBOUNCE_MS = 300;
export const GALLERY_PAGE_SIZE = 12;

export type GalleryFeedFilters = {
  q: string;
  category: GalleryCategory | 'all';
  period: GalleryPeriod;
  sort: GallerySort;
};

export const galleryFeedQueryKey = (locale: Locale, filters: GalleryFeedFilters) =>
  ['gallery', locale, filters.q, filters.category, filters.period, filters.sort] as const;

export const useGalleryFeed = (locale: Locale, filters: GalleryFeedFilters) => {
  const debouncedQuery = useDebouncedValue(filters.q, SEARCH_DEBOUNCE_MS);
  const resolvedFilters: GalleryFeedFilters = { ...filters, q: debouncedQuery };

  return useInfiniteQuery({
    queryKey: galleryFeedQueryKey(locale, resolvedFilters),
    queryFn: ({ pageParam }) =>
      searchGalleryRequest(locale, {
        q: resolvedFilters.q,
        category: resolvedFilters.category,
        period: resolvedFilters.period,
        sort: resolvedFilters.sort,
        page: pageParam,
        pageSize: GALLERY_PAGE_SIZE,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.page + 1 : undefined),
  });
};
