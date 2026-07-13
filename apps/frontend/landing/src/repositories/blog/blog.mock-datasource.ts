import 'server-only';

import { blogPostsByLocale } from '@/_mocks/blog/posts';
import type { Locale } from '@/config/site';

import type { BlogDatasource } from './blog.datasource';

export const createMockBlogDatasource = (): BlogDatasource => ({
  getPosts: (locale: Locale) => Promise.resolve(blogPostsByLocale[locale]),
  getPostBySlug: (locale: Locale, slug: string) =>
    Promise.resolve(blogPostsByLocale[locale].find((post) => post.slug === slug) ?? null),
});
