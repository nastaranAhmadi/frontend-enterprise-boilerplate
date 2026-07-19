import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getMenuItemDetail } from '@/application/menu/get-menu-item-detail';
import { siteKeywords } from '@/config/seo';
import { isLocale, type Locale, locales } from '@/config/site';
import { MenuDetailPage } from '@/features/menu/menu-detail-page';
import { createT } from '@/i18n/t';
import { buildLocalizedMenuItemPath } from '@/lib/seo/alternates';
import { createPageMetadata } from '@/lib/seo/metadata';
import { mockMenuDetailSlug } from '@/repositories/menu/menu-detail.types';

type MenuDetailRouteProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export const generateStaticParams = () =>
  locales.map((locale) => ({ locale, slug: mockMenuDetailSlug }));

export const generateMetadata = async ({ params }: MenuDetailRouteProps): Promise<Metadata> => {
  const { locale: localeParam, slug } = await params;

  if (!isLocale(localeParam)) {
    return {};
  }

  const item = await getMenuItemDetail(localeParam, slug);

  if (!item) {
    return {};
  }

  const t = createT(localeParam);

  return createPageMetadata({
    locale: localeParam,
    pathname: buildLocalizedMenuItemPath(localeParam, slug),
    title: `${item.name} · ${t('menuPage.title')}`,
    description: item.description,
    keywords: siteKeywords,
  });
};

export default async function MenuDetailRoute({ params }: MenuDetailRouteProps) {
  const { locale: localeParam, slug } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale: Locale = localeParam;

  return <MenuDetailPage locale={locale} slug={slug} />;
}
