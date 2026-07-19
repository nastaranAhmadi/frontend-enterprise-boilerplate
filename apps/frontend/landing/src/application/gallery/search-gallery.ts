import 'server-only';

import type { Locale } from '@/config/site';
import { createGalleryRepositoryForApp } from '@/repositories/gallery/create-gallery-repository';
import type { GallerySearchQuery, GallerySearchResult } from '@/repositories/gallery/gallery.types';

export const searchGallery = (
  locale: Locale,
  query: GallerySearchQuery,
): Promise<GallerySearchResult> => {
  const repository = createGalleryRepositoryForApp();
  return repository.search(locale, query);
};
