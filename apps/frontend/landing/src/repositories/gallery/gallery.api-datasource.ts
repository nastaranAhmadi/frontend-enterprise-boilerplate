import 'server-only';

import { createApiClient } from '@enterprise/api-client';

import { env } from '@/config/env';
import type { Locale } from '@/config/site';

import type { GalleryDatasource } from './gallery.datasource';
import type { GallerySearchQuery, GallerySearchResult } from './gallery.types';

const apiClient = createApiClient({
  baseUrl: env.siteUrl,
});

const toQueryString = (locale: Locale, query: GallerySearchQuery): string => {
  const params = new URLSearchParams({
    locale,
    q: query.q,
    category: query.category,
    period: query.period,
    sort: query.sort,
    page: String(query.page),
    pageSize: String(query.pageSize),
  });
  return params.toString();
};

export const createApiGalleryDatasource = (): GalleryDatasource => ({
  search: async (locale: Locale, query: GallerySearchQuery): Promise<GallerySearchResult> =>
    apiClient.request<GallerySearchResult>({
      path: `/api/gallery?${toQueryString(locale, query)}`,
    }),
});
