import type { Locale } from '@/config/site';
import { isLocale } from '@/config/site';
import {
  type GallerySearchQuery,
  isGalleryCategory,
  isGalleryPeriod,
  isGallerySort,
} from '@/repositories/gallery/gallery.types';

export const parseGallerySearchParams = (
  searchParams: URLSearchParams,
): { locale: Locale; query: GallerySearchQuery } | null => {
  const localeParam = searchParams.get('locale');
  if (!localeParam || !isLocale(localeParam)) {
    return null;
  }

  const categoryParam = searchParams.get('category') ?? 'all';
  const periodParam = searchParams.get('period') ?? 'any';
  const sortParam = searchParams.get('sort') ?? 'newest';
  const page = Number(searchParams.get('page') ?? '1');
  const pageSize = Number(searchParams.get('pageSize') ?? '12');

  if (categoryParam !== 'all' && !isGalleryCategory(categoryParam)) {
    return null;
  }
  if (!isGalleryPeriod(periodParam) || !isGallerySort(sortParam)) {
    return null;
  }
  if (!Number.isFinite(page) || page < 1 || !Number.isFinite(pageSize) || pageSize < 1) {
    return null;
  }

  return {
    locale: localeParam,
    query: {
      q: searchParams.get('q') ?? '',
      category: categoryParam === 'all' ? 'all' : categoryParam,
      period: periodParam,
      sort: sortParam,
      page,
      pageSize,
    },
  };
};
