import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { buildLocalizedPath } from '@/config/routes';
import { siteKeywords } from '@/config/seo';
import { isLocale, type Locale } from '@/config/site';
import { BlogListPage } from '@/features/blog/blog-list-page';
import { getDictionary } from '@/i18n/get-dictionary';
import { createPageMetadata } from '@/lib/seo/metadata';

type BlogRouteProps = {
  params: Promise<{ locale: string }>;
};

export const generateMetadata = async ({ params }: BlogRouteProps): Promise<Metadata> => {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    return {};
  }

  const dictionary = getDictionary(localeParam);

  return createPageMetadata({
    locale: localeParam,
    pathname: buildLocalizedPath(localeParam, 'blog'),
    title: dictionary.metadata.blogTitle,
    description: dictionary.metadata.blogDescription,
    keywords: siteKeywords,
  });
};

export default async function BlogRoute({ params }: BlogRouteProps) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale: Locale = localeParam;

  return <BlogListPage locale={locale} />;
}
