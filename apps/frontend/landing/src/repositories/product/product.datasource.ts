import 'server-only';

import type { Locale } from '@/config/site';

import type { Product } from './product.types';

export type ProductDatasource = {
  searchProducts: (locale: Locale, query: string) => Promise<Product[]>;
};
