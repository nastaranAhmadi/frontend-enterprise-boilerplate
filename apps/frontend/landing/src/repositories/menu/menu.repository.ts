import 'server-only';

import type { Locale } from '@/config/site';

import type { MenuDatasource } from './menu.datasource';
import type { MenuSearchQuery, MenuSearchResult } from './menu.types';

export type MenuRepository = {
  search: (locale: Locale, query: MenuSearchQuery) => Promise<MenuSearchResult>;
};

export const createMenuRepository = (datasource: MenuDatasource): MenuRepository => ({
  search: (locale, query) => datasource.search(locale, query),
});
