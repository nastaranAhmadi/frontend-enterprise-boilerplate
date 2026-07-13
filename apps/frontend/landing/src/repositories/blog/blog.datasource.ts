import 'server-only';

import type { Locale } from '@/config/site';

import type { BlogPost } from './blog.types';

export type BlogDatasource = {
  getPosts: (locale: Locale) => Promise<BlogPost[]>;
  getPostBySlug: (locale: Locale, slug: string) => Promise<BlogPost | null>;
};
