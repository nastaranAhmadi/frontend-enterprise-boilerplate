import 'server-only';

import { menuItemsByLocale } from '@/_mocks/menu/items';
import type { Locale } from '@/config/site';

import type { MenuDatasource } from './menu.datasource';
import type { MenuItem, MenuSearchQuery, MenuSearchResult } from './menu.types';

const MOCK_DELAY_MS = 200;

const normalize = (value: string): string => value.trim().toLowerCase();

const matchesQuery = (item: MenuItem, query: string): boolean => {
  const q = normalize(query);
  if (!q) return true;

  if (normalize(item.name).includes(q) || normalize(item.code).includes(q)) {
    return true;
  }
  if (normalize(item.description).includes(q) || normalize(item.taste).includes(q)) {
    return true;
  }
  return item.ingredients.some((ingredient) => normalize(ingredient).includes(q));
};

export const createMockMenuDatasource = (): MenuDatasource => ({
  search: async (locale: Locale, query: MenuSearchQuery): Promise<MenuSearchResult> => {
    await new Promise((resolve) => {
      setTimeout(resolve, MOCK_DELAY_MS);
    });

    const filtered = menuItemsByLocale[locale].filter((item) => {
      if (!matchesQuery(item, query.q)) return false;
      if (query.category !== 'all' && item.category !== query.category) return false;
      return true;
    });

    const page = Math.max(1, query.page);
    const pageSize = Math.max(1, Math.min(query.pageSize, 48));
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
