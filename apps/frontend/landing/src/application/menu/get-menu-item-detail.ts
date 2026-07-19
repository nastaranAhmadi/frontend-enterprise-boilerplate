import { cache } from 'react';

import { getMockMenuDetail } from '@/_mocks/menu/detail';
import type { Locale } from '@/config/site';
import type { MenuDetail } from '@/repositories/menu/menu-detail.types';

export type { MenuDetail };

export const getMenuItemDetail = cache(
  (locale: Locale, slug: string): Promise<MenuDetail | null> =>
    Promise.resolve(getMockMenuDetail(locale, slug)),
);
