import 'server-only';

import type { Locale } from '@/config/site';

import type { AboutPageResponse } from './about.types';

export type AboutDatasource = {
  getPage: (locale: Locale) => Promise<AboutPageResponse>;
};
