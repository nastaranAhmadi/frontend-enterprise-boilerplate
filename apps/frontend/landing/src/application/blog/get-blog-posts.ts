import 'server-only';

import { cache } from 'react';

import type { Locale } from '@/config/site';
import type { BlogPost } from '@/repositories/blog/blog.types';
import { createBlogRepositoryForApp } from '@/repositories/blog/create-blog-repository';

export const getBlogPosts = cache(async (locale: Locale): Promise<BlogPost[]> => {
  const repository = createBlogRepositoryForApp();
  return repository.getPosts(locale);
});
