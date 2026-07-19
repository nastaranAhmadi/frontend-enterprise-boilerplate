import 'server-only';

import { cache } from 'react';

import type { Locale } from '@/config/site';
import type { BlogPageResponse } from '@/repositories/blog/blog.types';
import { createBlogRepositoryForApp } from '@/repositories/blog/create-blog-repository';

export const getBlogPost = cache(
  async (locale: Locale, slug: string): Promise<BlogPageResponse | null> => {
    const repository = createBlogRepositoryForApp();
    return await repository.getPostBySlug(locale, slug);
  },
);
