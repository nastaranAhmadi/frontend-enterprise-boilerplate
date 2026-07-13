import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { buildLocalizedPath } from '@/config/routes';
import { siteKeywords } from '@/config/seo';
import { isLocale, type Locale } from '@/config/site';
import { ContactPage } from '@/features/contact/contact-page';
import { getDictionary } from '@/i18n/get-dictionary';
import { createPageMetadata } from '@/lib/seo/metadata';

type ContactRouteProps = {
  params: Promise<{ locale: string }>;
};

export const generateMetadata = async ({ params }: ContactRouteProps): Promise<Metadata> => {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    return {};
  }

  const dictionary = getDictionary(localeParam);

  return createPageMetadata({
    locale: localeParam,
    pathname: buildLocalizedPath(localeParam, 'contact'),
    title: dictionary.metadata.contactTitle,
    description: dictionary.metadata.contactDescription,
    keywords: siteKeywords,
  });
};

export default async function ContactRoute({ params }: ContactRouteProps) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale: Locale = localeParam;

  return <ContactPage locale={locale} />;
}
