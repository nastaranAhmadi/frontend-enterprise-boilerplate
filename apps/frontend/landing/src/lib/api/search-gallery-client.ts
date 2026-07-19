import type { Locale } from '@/config/site';
import type { GallerySearchQuery, GallerySearchResult } from '@/repositories/gallery/gallery.types';

export const searchGalleryRequest = async (
  locale: Locale,
  query: GallerySearchQuery,
): Promise<GallerySearchResult> => {
  const params = new URLSearchParams({
    locale,
    q: query.q,
    category: query.category,
    period: query.period,
    sort: query.sort,
    page: String(query.page),
    pageSize: String(query.pageSize),
  });

  const response = await fetch(`/api/gallery?${params.toString()}`);

  if (!response.ok) {
    throw new Error('Gallery search failed.');
  }

  return (await response.json()) as GallerySearchResult;
};
