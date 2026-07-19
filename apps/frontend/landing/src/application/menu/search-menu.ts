import 'server-only';

import type { Locale } from '@/config/site';
import { createMenuRepositoryForApp } from '@/repositories/menu/create-menu-repository';
import type { MenuSearchQuery, MenuSearchResult } from '@/repositories/menu/menu.types';

export const searchMenu = (locale: Locale, query: MenuSearchQuery): Promise<MenuSearchResult> => {
  const repository = createMenuRepositoryForApp();
  return repository.search(locale, query);
};
