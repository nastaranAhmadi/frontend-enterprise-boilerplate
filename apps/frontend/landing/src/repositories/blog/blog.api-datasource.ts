import 'server-only';

import { createApiClient } from '@enterprise/api-client';

import { env } from '@/config/env';
import type { Locale } from '@/config/site';

import type { BlogDatasource } from './blog.datasource';
import type { BlogPost } from './blog.types';

const apiClient = createApiClient({
  baseUrl: env.siteUrl,
});

export const createApiBlogDatasource = (): BlogDatasource => ({
  getPosts: async (locale: Locale) =>
    apiClient.request<BlogPost[]>({ path: `/api/blog?locale=${locale}` }),
  getPostBySlug: async (locale: Locale, slug: string) =>
    apiClient.request<BlogPost | null>({ path: `/api/blog/${slug}?locale=${locale}` }),
});
