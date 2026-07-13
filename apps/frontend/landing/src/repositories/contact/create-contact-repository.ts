import 'server-only';

import { env } from '@/config/env';

import { createApiContactDatasource } from './contact.api-datasource';
import { createMockContactDatasource } from './contact.mock-datasource';
import { createContactRepository } from './contact.repository';

export const createContactRepositoryForApp = () => {
  const datasource =
    env.dataSource === 'api' ? createApiContactDatasource() : createMockContactDatasource();

  return createContactRepository(datasource);
};
