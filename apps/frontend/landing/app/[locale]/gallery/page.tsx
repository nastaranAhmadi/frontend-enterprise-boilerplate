import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { buildLocalizedPath } from '@/config/routes';
import { siteKeywords } from '@/config/seo';
import { isLocale, type Locale } from '@/config/site';
import { GalleryPage } from '@/features/gallery/gallery-page';
import { createT } from '@/i18n/t';
import { createPageMetadata } from '@/lib/seo/metadata';

type GalleryRouteProps = {
  params: Promise<{ locale: string }>;
};

export const generateMetadata = async ({ params }: GalleryRouteProps): Promise<Metadata> => {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    return {};
  }

  const t = createT(localeParam);

  return createPageMetadata({
    locale: localeParam,
    pathname: buildLocalizedPath(localeParam, 'gallery'),
    title: t('metadata.galleryTitle'),
    description: t('metadata.galleryDescription'),
    keywords: siteKeywords,
  });
};

export default async function GalleryRoute({ params }: GalleryRouteProps) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale: Locale = localeParam;

  return <GalleryPage locale={locale} />;
}
