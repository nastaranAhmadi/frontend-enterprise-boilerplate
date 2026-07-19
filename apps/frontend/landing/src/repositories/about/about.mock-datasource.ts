import 'server-only';

import { aboutPageByLocale } from '@/_mocks/about/page';
import type { Locale } from '@/config/site';

import type { AboutDatasource } from './about.datasource';

export const createMockAboutDatasource = (): AboutDatasource => ({
  getPage: (locale: Locale) => Promise.resolve(aboutPageByLocale[locale]),
});
