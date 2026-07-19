import 'server-only';

import { galleryItemsByLocale } from '@/_mocks/gallery/items';
import type { Locale } from '@/config/site';

import type { GalleryDatasource } from './gallery.datasource';
import type {
  GalleryItem,
  GalleryPeriod,
  GallerySearchQuery,
  GallerySearchResult,
  GallerySort,
} from './gallery.types';

const MOCK_DELAY_MS = 350;

const normalize = (value: string): string => value.trim().toLowerCase();

const matchesQuery = (item: GalleryItem, query: string): boolean => {
  const q = normalize(query);
  if (!q) return true;
  return normalize(item.name).includes(q) || normalize(item.code).includes(q);
};

const periodStart = (period: GalleryPeriod, now: Date): Date | null => {
  if (period === 'any') return null;
  const start = new Date(now);
  if (period === 'week') {
    start.setDate(start.getDate() - 7);
    return start;
  }
  if (period === 'month') {
    start.setMonth(start.getMonth() - 1);
    return start;
  }
  start.setFullYear(start.getFullYear() - 1);
  return start;
};

const sortItems = (items: GalleryItem[], sort: GallerySort): GalleryItem[] => {
  const next = [...items];
  switch (sort) {
    case 'mostOrdered':
      return next.sort((a, b) => b.orderCount - a.orderCount);
    case 'trending':
      return next.sort((a, b) => b.trendScore - a.trendScore);
    case 'name':
      return next.sort((a, b) => a.name.localeCompare(b.name));
    case 'newest':
    default:
      return next.sort(
        (a, b) => new Date(b.capturedAt).getTime() - new Date(a.capturedAt).getTime(),
      );
  }
};

export const createMockGalleryDatasource = (): GalleryDatasource => ({
  search: async (locale: Locale, query: GallerySearchQuery): Promise<GallerySearchResult> => {
    await new Promise((resolve) => {
      setTimeout(resolve, MOCK_DELAY_MS);
    });

    const now = new Date();
    const from = periodStart(query.period, now);

    let filtered = galleryItemsByLocale[locale].filter((item) => {
      if (!matchesQuery(item, query.q)) return false;
      if (query.category !== 'all' && item.category !== query.category) return false;
      if (from && new Date(item.capturedAt) < from) return false;
      return true;
    });

    filtered = sortItems(filtered, query.sort);

    const page = Math.max(1, query.page);
    const pageSize = Math.max(1, Math.min(query.pageSize, 24));
    const start = (page - 1) * pageSize;
    const items = filtered.slice(start, start + pageSize);
    const total = filtered.length;

    return {
      items,
      page,
      pageSize,
      total,
      hasMore: start + items.length < total,
    };
  },
});
