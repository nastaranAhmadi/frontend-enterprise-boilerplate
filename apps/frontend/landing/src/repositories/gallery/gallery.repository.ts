import 'server-only';

import type { Locale } from '@/config/site';

import type { GalleryDatasource } from './gallery.datasource';
import type { GallerySearchQuery, GallerySearchResult } from './gallery.types';

export type GalleryRepository = {
  search: (locale: Locale, query: GallerySearchQuery) => Promise<GallerySearchResult>;
};

export const createGalleryRepository = (datasource: GalleryDatasource): GalleryRepository => ({
  search: (locale, query) => datasource.search(locale, query),
});
