import type { Locale } from '@/config/site';
import type { Product } from '@/repositories/product/product.types';

export const searchProductsRequest = async (locale: Locale, query: string): Promise<Product[]> => {
  const params = new URLSearchParams({ locale, q: query });
  const response = await fetch(`/api/products/search?${params.toString()}`);

  if (!response.ok) {
    throw new Error('Product search failed.');
  }

  return (await response.json()) as Product[];
};
