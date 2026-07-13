import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { buildLocalizedPath } from '@/config/routes';
import { siteKeywords } from '@/config/seo';
import { isLocale, type Locale } from '@/config/site';
import { FaqPage } from '@/features/faq/faq-page';
import { getDictionary } from '@/i18n/get-dictionary';
import { createPageMetadata } from '@/lib/seo/metadata';

type FaqRouteProps = {
  params: Promise<{ locale: string }>;
};

export const generateMetadata = async ({ params }: FaqRouteProps): Promise<Metadata> => {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    return {};
  }

  const dictionary = getDictionary(localeParam);

  return createPageMetadata({
    locale: localeParam,
    pathname: buildLocalizedPath(localeParam, 'faq'),
    title: dictionary.metadata.faqTitle,
    description: dictionary.metadata.faqDescription,
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
