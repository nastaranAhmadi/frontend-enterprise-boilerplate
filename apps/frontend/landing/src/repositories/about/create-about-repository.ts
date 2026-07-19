import 'server-only';

import { env } from '@/config/env';

import { createApiAboutDatasource } from './about.api-datasource';
import { createMockAboutDatasource } from './about.mock-datasource';
import { type AboutRepository,createAboutRepository } from './about.repository';

export const createAboutRepositoryForApp = (): AboutRepository => {
  const datasource =
    env.dataSource === 'api' ? createApiAboutDatasource() : createMockAboutDatasource();

  return createAboutRepository(datasource);
};
