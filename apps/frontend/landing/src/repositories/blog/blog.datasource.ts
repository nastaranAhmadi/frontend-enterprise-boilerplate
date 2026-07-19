import 'server-only';

import type { Locale } from '@/config/site';

import type { BlogPageResponse } from './blog.types';

export type BlogDatasource = {
  getIndexPage: (locale: Locale) => Promise<BlogPageResponse>;
  /** URL slugs available for SSG/sitemap — not part of the HTML page contract. */
  getPostSlugs: (locale: Locale) => Promise<string[]>;
  getPostBySlug: (locale: Locale, slug: string) => Promise<BlogPageResponse | null>;
};
