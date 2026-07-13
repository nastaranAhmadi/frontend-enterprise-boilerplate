import { ContentPage } from '@/components/layout/content-page';
import type { Locale } from '@/config/site';
import { ProductSearch } from '@/features/products/components/product-search';
import { getDictionary } from '@/i18n/get-dictionary';
import { createBreadcrumbs } from '@/lib/seo/breadcrumbs';

type ProductsPageProps = {
  locale: Locale;
};

export const ProductsPage = ({ locale }: ProductsPageProps) => {
  const dictionary = getDictionary(locale);
  const breadcrumbs = createBreadcrumbs(locale, [
    { label: dictionary.navigation.home, route: 'home' },
    { label: dictionary.products.title, route: 'products' },
  ]);

  return (
    <ContentPage
      title={dictionary.products.title}
      description={dictionary.products.description}
      breadcrumbs={breadcrumbs}
    >
      <ProductSearch locale={locale} labels={dictionary.products.search} />
    </ContentPage>
  );
};
