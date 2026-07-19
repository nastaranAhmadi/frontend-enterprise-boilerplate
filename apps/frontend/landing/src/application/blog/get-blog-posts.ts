import 'server-only';

import { cache } from 'react';

import type { Locale } from '@/config/site';
import type { BlogPageResponse } from '@/repositories/blog/blog.types';
import { createBlogRepositoryForApp } from '@/repositories/blog/create-blog-repository';

export const getBlogIndexPage = cache(async (locale: Locale): Promise<BlogPageResponse> => {
  const repository = createBlogRepositoryForApp();
  return await repository.getIndexPage(locale);
});

/** Slugs for SSG/sitemap only — not the HTML page payload. */
export const getBlogPostSlugs = cache(async (locale: Locale): Promise<string[]> => {
  const repository = createBlogRepositoryForApp();
  return await repository.getPostSlugs(locale);
});
