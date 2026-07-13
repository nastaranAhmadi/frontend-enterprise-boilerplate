import 'server-only';

import type { Locale } from '@/config/site';

import type { BlogDatasource } from './blog.datasource';
import type { BlogPost } from './blog.types';

export const createBlogRepository = (datasource: BlogDatasource) => ({
  getPosts: (locale: Locale): Promise<BlogPost[]> => datasource.getPosts(locale),
  getPostBySlug: (locale: Locale, slug: string): Promise<BlogPost | null> =>
    datasource.getPostBySlug(locale, slug),
});

export type BlogRepository = ReturnType<typeof createBlogRepository>;
