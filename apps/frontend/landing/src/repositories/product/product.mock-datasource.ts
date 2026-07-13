import 'server-only';

import { productsByLocale } from '@/_mocks/product/products';
import type { Locale } from '@/config/site';

import type { ProductDatasource } from './product.datasource';
import type { Product } from './product.types';

const MOCK_DELAY_MS = 400;

const normalize = (value: string): string => value.trim().toLowerCase();

const matchesQuery = (product: Product, query: string): boolean => {
  const normalizedQuery = normalize(query);

  if (!normalizedQuery) {
    return true;
  }

  const haystack = [product.name, product.description, product.category].map(normalize).join(' ');

  return haystack.includes(normalizedQuery);
};

export const createMockProductDatasource = (): ProductDatasource => ({
  searchProducts: async (locale: Locale, query: string): Promise<Product[]> => {
    await new Promise((resolve) => {
      setTimeout(resolve, MOCK_DELAY_MS);
    });

    return productsByLocale[locale].filter((product) => matchesQuery(product, query));
  },
});
