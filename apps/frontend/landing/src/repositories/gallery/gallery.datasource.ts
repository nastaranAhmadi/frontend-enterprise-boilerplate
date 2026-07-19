import 'server-only';

import type { Locale } from '@/config/site';

import type { GallerySearchQuery, GallerySearchResult } from './gallery.types';

export type GalleryDatasource = {
  search: (locale: Locale, query: GallerySearchQuery) => Promise<GallerySearchResult>;
};
