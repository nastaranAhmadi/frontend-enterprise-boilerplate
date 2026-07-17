import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { buildLocalizedPath } from '@/config/routes';
import { siteKeywords } from '@/config/seo';
import { isLocale, type Locale } from '@/config/site';
import { FaqPage } from '@/features/faq/faq-page';
import { createT } from '@/i18n/t';
import { createPageMetadata } from '@/lib/seo/metadata';

type FaqRouteProps = {
  params: Promise<{ locale: string }>;
};

export const generateMetadata = async ({ params }: FaqRouteProps): Promise<Metadata> => {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    return {};
  }

  const t = createT(localeParam);

  return createPageMetadata({
    locale: localeParam,
    pathname: buildLocalizedPath(localeParam, 'faq'),
    title: t('metadata.faqTitle'),
    description: t('metadata.faqDescription'),
    keywords: siteKeywords,
  });
};

export default async function FaqRoute({ params }: FaqRouteProps) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale: Locale = localeParam;

  return <FaqPage locale={locale} />;
}
