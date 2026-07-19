import 'server-only';

import { createApiClient } from '@enterprise/api-client';

import { env } from '@/config/env';
import type { Locale } from '@/config/site';

import type { AboutDatasource } from './about.datasource';
import type { AboutPageResponse } from './about.types';

const apiClient = createApiClient({
  baseUrl: env.siteUrl,
});

export const createApiAboutDatasource = (): AboutDatasource => ({
  getPage: async (locale: Locale) =>
    apiClient.request<AboutPageResponse>({ path: `/api/about?locale=${locale}` }),
});
