import 'server-only';

import { env } from '@/config/env';

import { createApiMenuDatasource } from './menu.api-datasource';
import { createMockMenuDatasource } from './menu.mock-datasource';
import { createMenuRepository, type MenuRepository } from './menu.repository';

export const createMenuRepositoryForApp = (): MenuRepository => {
  const datasource =
    env.dataSource === 'api' ? createApiMenuDatasource() : createMockMenuDatasource();

  return createMenuRepository(datasource);
};
