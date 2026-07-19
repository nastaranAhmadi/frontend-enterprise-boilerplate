import 'server-only';

import { env } from '@/config/env';

import { createApiBlogDatasource } from './blog.api-datasource';
import { createMockBlogDatasource } from './blog.mock-datasource';
import { type BlogRepository, createBlogRepository } from './blog.repository';

export const createBlogRepositoryForApp = (): BlogRepository => {
  const datasource =
    env.dataSource === 'api' ? createApiBlogDatasource() : createMockBlogDatasource();

  return createBlogRepository(datasource);
};
