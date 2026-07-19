import 'server-only';

import type { Locale } from '@/config/site';

import type { MenuSearchQuery, MenuSearchResult } from './menu.types';

export type MenuDatasource = {
  search: (locale: Locale, query: MenuSearchQuery) => Promise<MenuSearchResult>;
};
