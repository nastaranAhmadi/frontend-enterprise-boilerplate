import 'server-only';

import { env } from '@/config/env';

import { createApiGalleryDatasource } from './gallery.api-datasource';
import { createMockGalleryDatasource } from './gallery.mock-datasource';
import { createGalleryRepository, type GalleryRepository } from './gallery.repository';

export const createGalleryRepositoryForApp = (): GalleryRepository => {
  const datasource =
    env.dataSource === 'api' ? createApiGalleryDatasource() : createMockGalleryDatasource();

  return createGalleryRepository(datasource);
};
