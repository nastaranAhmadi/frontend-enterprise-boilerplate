import 'server-only';

import type { Locale } from '@/config/site';

import type { BlogDatasource } from './blog.datasource';
import type { BlogPageResponse } from './blog.types';

export type BlogRepository = {
  getIndexPage: (locale: Locale) => Promise<BlogPageResponse>;
  getPostSlugs: (locale: Locale) => Promise<string[]>;
  getPostBySlug: (locale: Locale, slug: string) => Promise<BlogPageResponse | null>;
};

export const createBlogRepository = (datasource: BlogDatasource): BlogRepository => ({
  getIndexPage: (locale: Locale): Promise<BlogPageResponse> => datasource.getIndexPage(locale),
  getPostSlugs: (locale: Locale): Promise<string[]> => datasource.getPostSlugs(locale),
  getPostBySlug: (locale: Locale, slug: string): Promise<BlogPageResponse | null> =>
    datasource.getPostBySlug(locale, slug),
});
