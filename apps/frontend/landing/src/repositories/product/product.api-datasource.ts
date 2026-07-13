import 'server-only';

import { createApiClient } from '@enterprise/api-client';

import { env } from '@/config/env';
import type { Locale } from '@/config/site';

import type { ProductDatasource } from './product.datasource';
import type { Product } from './product.types';

const apiClient = createApiClient({
  baseUrl: env.siteUrl,
});

export const createApiProductDatasource = (): ProductDatasource => ({
  searchProducts: async (locale: Locale, query: string): Promise<Product[]> =>
    apiClient.request<Product[]>({
      path: `/api/products?locale=${locale}&q=${encodeURIComponent(query)}`,
    }),
});
