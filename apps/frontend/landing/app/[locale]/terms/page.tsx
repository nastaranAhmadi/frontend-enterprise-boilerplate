import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { buildLocalizedPath } from '@/config/routes';
import { siteKeywords } from '@/config/seo';
import { isLocale, type Locale } from '@/config/site';
import { TermsPage } from '@/features/terms/terms-page';
import { createT } from '@/i18n/t';
import { createPageMetadata } from '@/lib/seo/metadata';

type TermsRouteProps = {
  params: Promise<{ locale: string }>;
};

export const generateMetadata = async ({ params }: TermsRouteProps): Promise<Metadata> => {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    return {};
  }

  const t = createT(localeParam);

  return createPageMetadata({
    locale: localeParam,
    pathname: buildLocalizedPath(localeParam, 'terms'),
    title: t('metadata.termsTitle'),
    description: t('metadata.termsDescription'),
    keywords: siteKeywords,
  });
};

export default async function TermsRoute({ params }: TermsRouteProps) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale: Locale = localeParam;

  return <TermsPage locale={locale} />;
}
