import 'server-only';

import { cache } from 'react';

import type { Locale } from '@/config/site';
import type { BlogPost } from '@/repositories/blog/blog.types';
import { createBlogRepositoryForApp } from '@/repositories/blog/create-blog-repository';

export const getBlogPost = cache(async (locale: Locale, slug: string): Promise<BlogPost | null> => {
  const repository = createBlogRepositoryForApp();
  return repository.getPostBySlug(locale, slug);
});
