import 'server-only';

import { env } from '@/config/env';

import { createApiProductDatasource } from './product.api-datasource';
import { createMockProductDatasource } from './product.mock-datasource';
import { createProductRepository } from './product.repository';

export const createProductRepositoryForApp = () => {
  const datasource =
    env.dataSource === 'api' ? createApiProductDatasource() : createMockProductDatasource();

  return createProductRepository(datasource);
};
