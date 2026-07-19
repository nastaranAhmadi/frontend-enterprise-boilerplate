import 'server-only';

import type { Locale } from '@/config/site';

import type { AboutDatasource } from './about.datasource';
import type { AboutPageResponse } from './about.types';

export type AboutRepository = {
  getPage: (locale: Locale) => Promise<AboutPageResponse>;
};

export const createAboutRepository = (datasource: AboutDatasource): AboutRepository => ({
  getPage: (locale: Locale): Promise<AboutPageResponse> => datasource.getPage(locale),
});
