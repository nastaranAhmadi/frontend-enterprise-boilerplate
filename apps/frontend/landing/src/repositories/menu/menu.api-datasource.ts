import 'server-only';

import { createApiClient } from '@enterprise/api-client';

import { env } from '@/config/env';
import type { Locale } from '@/config/site';

import type { MenuDatasource } from './menu.datasource';
import type { MenuSearchQuery, MenuSearchResult } from './menu.types';

const apiClient = createApiClient({
  baseUrl: env.siteUrl,
});

const toQueryString = (locale: Locale, query: MenuSearchQuery): string => {
  const params = new URLSearchParams({
    locale,
    q: query.q,
    category: query.category,
    page: String(query.page),
    pageSize: String(query.pageSize),
  });
  return params.toString();
};

/** Reserved for Phase 4+ when `/api/menu` exists. */
export const createApiMenuDatasource = (): MenuDatasource => ({
  search: async (locale: Locale, query: MenuSearchQuery): Promise<MenuSearchResult> =>
    apiClient.request<MenuSearchResult>({
      path: `/api/menu?${toQueryString(locale, query)}`,
    }),
});
