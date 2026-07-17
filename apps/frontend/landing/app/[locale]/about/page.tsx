import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { buildLocalizedPath } from '@/config/routes';
import { siteKeywords } from '@/config/seo';
import { isLocale, type Locale } from '@/config/site';
import { AboutPage } from '@/features/about/about-page';
import { createT } from '@/i18n/t';
import { createPageMetadata } from '@/lib/seo/metadata';

type AboutRouteProps = {
  params: Promise<{ locale: string }>;
};

export const generateMetadata = async ({ params }: AboutRouteProps): Promise<Metadata> => {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    return {};
  }

  const t = createT(localeParam);

  return createPageMetadata({
    locale: localeParam,
    pathname: buildLocalizedPath(localeParam, 'about'),
    title: t('metadata.aboutTitle'),
    description: t('metadata.aboutDescription'),
    keywords: siteKeywords,
  });
};

export default async function AboutRoute({ params }: AboutRouteProps) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale: Locale = localeParam;

  return <AboutPage locale={locale} />;
}
