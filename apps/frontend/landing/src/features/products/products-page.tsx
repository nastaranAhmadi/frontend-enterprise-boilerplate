import { ContentPage } from '@/components/layout/content-page';
import type { Locale } from '@/config/site';
import { ProductSearch } from '@/features/products/components/product-search';
import type { ProductSearchLabels } from '@/features/products/product-search.types';
import { createT } from '@/i18n/t';
import { createBreadcrumbs } from '@/lib/seo/breadcrumbs';

type ProductsPageProps = {
  locale: Locale;
};

const getProductSearchLabels = (locale: Locale): ProductSearchLabels => {
  const t = createT(locale);

  return {
    searchLabel: t('products.search.searchLabel'),
    searchPlaceholder: t('products.search.searchPlaceholder'),
    loading: t('products.search.loading'),
    empty: t('products.search.empty'),
    error: t('products.search.error'),
    resultCount: t('products.search.resultCount'),
  };
};

export const ProductsPage = ({ locale }: ProductsPageProps) => {
  const t = createT(locale);
  const breadcrumbs = createBreadcrumbs(locale, [
    { label: t('navigation.home'), route: 'home' },
    { label: t('products.title'), route: 'products' },
  ]);

  return (
    <ContentPage
      title={t('products.title')}
      description={t('products.description')}
      breadcrumbs={breadcrumbs}
    >
      <ProductSearch locale={locale} labels={getProductSearchLabels(locale)} />
    </ContentPage>
  );
};
