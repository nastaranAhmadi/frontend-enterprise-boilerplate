import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { buildLocalizedPath } from '@/config/routes';
import { siteKeywords } from '@/config/seo';
import { isLocale, type Locale } from '@/config/site';
import { ProductsPage } from '@/features/products/products-page';
import { createT } from '@/i18n/t';
import { createPageMetadata } from '@/lib/seo/metadata';

type ProductsRouteProps = {
  params: Promise<{ locale: string }>;
};

export const generateMetadata = async ({ params }: ProductsRouteProps): Promise<Metadata> => {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    return {};
  }

  const t = createT(localeParam);

  return createPageMetadata({
    locale: localeParam,
    pathname: buildLocalizedPath(localeParam, 'products'),
    title: t('metadata.productsTitle'),
    description: t('metadata.productsDescription'),
    keywords: siteKeywords,
  });
};

export default async function ProductsRoute({ params }: ProductsRouteProps) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale: Locale = localeParam;

  return <ProductsPage locale={locale} />;
}
