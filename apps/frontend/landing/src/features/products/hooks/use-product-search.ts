'use client';

import { useDebouncedValue } from '@enterprise/hooks';
import { useQuery } from '@tanstack/react-query';

import type { Locale } from '@/config/site';
import { searchProductsRequest } from '@/lib/api/search-products-client';

const SEARCH_DEBOUNCE_MS = 300;

export const productSearchQueryKey = (locale: Locale, query: string) =>
  ['products', locale, query] as const;

export const useProductSearch = (locale: Locale, query: string) => {
  const debouncedQuery = useDebouncedValue(query, SEARCH_DEBOUNCE_MS);

  return useQuery({
    queryKey: productSearchQueryKey(locale, debouncedQuery),
    queryFn: () => searchProductsRequest(locale, debouncedQuery),
  });
};
