import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { siteKeywords } from '@/config/seo';
import { isLocale, type Locale } from '@/config/site';
import { LandingPage } from '@/features/landing/landing-page';
import { getDictionary } from '@/i18n/get-dictionary';
import { createPageMetadata } from '@/lib/seo/metadata';

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export const generateMetadata = async ({ params }: HomePageProps): Promise<Metadata> => {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) {
    return {};
  }

  const dictionary = getDictionary(localeParam);

  return createPageMetadata({
    locale: localeParam,
    pathname: `/${localeParam}`,
    title: dictionary.metadata.homeTitle,
    description: dictionary.metadata.homeDescription,
    keywords: siteKeywords,
  });
};

export default async function HomePage({ params }: HomePageProps) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale: Locale = localeParam;

  return <LandingPage locale={locale} />;
}
