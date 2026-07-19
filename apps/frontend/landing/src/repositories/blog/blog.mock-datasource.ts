import 'server-only';

import { blogDetailByLocale, blogIndexByLocale } from '@/_mocks/blog/posts';
import type { Locale } from '@/config/site';

import type { BlogDatasource } from './blog.datasource';

export const createMockBlogDatasource = (): BlogDatasource => ({
  getIndexPage: (locale: Locale) => Promise.resolve(blogIndexByLocale[locale]),
  getPostSlugs: (locale: Locale) => Promise.resolve(Object.keys(blogDetailByLocale[locale])),
  getPostBySlug: (locale: Locale, slug: string) =>
    Promise.resolve(blogDetailByLocale[locale][slug] ?? null),
});
