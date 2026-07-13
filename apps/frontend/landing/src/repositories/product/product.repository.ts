import 'server-only';

import type { Locale } from '@/config/site';

import type { ProductDatasource } from './product.datasource';
import type { Product } from './product.types';

export const createProductRepository = (datasource: ProductDatasource) => ({
  searchProducts: (locale: Locale, query: string): Promise<Product[]> =>
    datasource.searchProducts(locale, query),
});

export type ProductRepository = ReturnType<typeof createProductRepository>;
