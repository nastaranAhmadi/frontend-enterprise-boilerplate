'use client';

import { FormField } from '@enterprise/ui';
import { Skeleton } from '@enterprise/ui/skeleton';
import { useId, useState } from 'react';

import type { Locale } from '@/config/site';
import { ProductCard } from '@/features/products/components/product-card';
import { useProductSearch } from '@/features/products/hooks/use-product-search';
import type { ProductSearchLabels } from '@/features/products/product-search.types';

type ProductSearchProps = {
  locale: Locale;
  labels: ProductSearchLabels;
};

const ProductSearchSkeleton = () => (
  <ul className="flex flex-col gap-md" aria-hidden="true">
    {Array.from({ length: 3 }, (_, index) => (
      <li key={index}>
        <Skeleton variant="rounded" className="h-28 w-full" />
      </li>
    ))}
  </ul>
);

export const ProductSearch = ({ locale, labels }: ProductSearchProps) => {
  const [query, setQuery] = useState('');
  const searchFieldId = useId();
  const { data, isFetching, isLoading, isError } = useProductSearch(locale, query);

  const products = data ?? [];
  const showInitialLoading = isLoading && products.length === 0;
  const showEmpty = !isFetching && !isError && products.length === 0;

  return (
    <div className="flex flex-col gap-lg">
      <FormField
        id={searchFieldId}
        type="search"
        label={labels.searchLabel}
        placeholder={labels.searchPlaceholder}
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
        }}
        autoComplete="off"
      />

      {showInitialLoading ? <ProductSearchSkeleton /> : null}

      {!showInitialLoading && isError ? (
        <p className="text-sm text-error" role="alert">
          {labels.error}
        </p>
      ) : null}

      {!showInitialLoading && !isError ? (
        <>
          <p className="text-sm text-muted" aria-live="polite">
            {labels.resultCount.replace('{count}', String(products.length))}
          </p>

          {showEmpty ? <p className="text-muted">{labels.empty}</p> : null}

          {products.length > 0 ? (
            <ul className="flex flex-col gap-md">
              {products.map((product) => (
                <li key={product.id}>
                  <ProductCard product={product} />
                </li>
              ))}
            </ul>
          ) : null}
        </>
      ) : null}
    </div>
  );
};
