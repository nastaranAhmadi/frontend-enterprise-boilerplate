import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { buildLocalizedPath } from '@/config/routes';
import { siteKeywords } from '@/config/seo';
import { isLocale, type Locale } from '@/config/site';
import { MenuPage } from '@/features/menu/menu-page';
import { createT } from '@/i18n/t';
import { createPageMetadata } from '@/lib/seo/metadata';

type MenuRouteProps = {
  params: Promise<{ locale: string }>;
};

export const generateMetadata = async ({ params }: MenuRouteProps): Promise<Metadata> => {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    return {};
  }

  const t = createT(localeParam);

  return createPageMetadata({
    locale: localeParam,
    pathname: buildLocalizedPath(localeParam, 'menu'),
    title: t('metadata.menuTitle'),
    description: t('metadata.menuDescription'),
    keywords: siteKeywords,
  });
};

export default async function MenuRoute({ params }: MenuRouteProps) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale: Locale = localeParam;

  return <MenuPage locale={locale} />;
}
