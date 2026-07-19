import 'server-only';

import { createApiClient } from '@enterprise/api-client';

import { env } from '@/config/env';
import type { Locale } from '@/config/site';

import type { BlogDatasource } from './blog.datasource';
import type { BlogPageResponse } from './blog.types';

const apiClient = createApiClient({
  baseUrl: env.siteUrl,
});

export const createApiBlogDatasource = (): BlogDatasource => ({
  getIndexPage: async (locale: Locale) =>
    apiClient.request<BlogPageResponse>({ path: `/api/blog?locale=${locale}` }),
  getPostSlugs: async (locale: Locale) =>
    apiClient.request<string[]>({ path: `/api/blog/slugs?locale=${locale}` }),
  getPostBySlug: async (locale: Locale, slug: string) =>
    apiClient.request<BlogPageResponse | null>({ path: `/api/blog/${slug}?locale=${locale}` }),
});
