import 'server-only';

import { env } from '@/config/env';

import { createApiBlogDatasource } from './blog.api-datasource';
import { createMockBlogDatasource } from './blog.mock-datasource';
import { createBlogRepository } from './blog.repository';

export const createBlogRepositoryForApp = () => {
  const datasource =
    env.dataSource === 'api' ? createApiBlogDatasource() : createMockBlogDatasource();

  return createBlogRepository(datasource);
};
