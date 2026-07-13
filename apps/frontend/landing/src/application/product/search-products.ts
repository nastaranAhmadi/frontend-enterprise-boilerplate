import 'server-only';

import type { Locale } from '@/config/site';
import { createProductRepositoryForApp } from '@/repositories/product/create-product-repository';
import type { Product } from '@/repositories/product/product.types';

export const searchProducts = (locale: Locale, query: string): Promise<Product[]> => {
  const repository = createProductRepositoryForApp();
  return repository.searchProducts(locale, query);
};
