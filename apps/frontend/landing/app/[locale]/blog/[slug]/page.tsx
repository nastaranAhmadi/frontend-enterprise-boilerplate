import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getBlogPostSlugs } from '@/application/blog/get-blog-posts';
import { siteKeywords } from '@/config/seo';
import { isLocale, type Locale, locales } from '@/config/site';
import { BlogPostPage } from '@/features/blog/blog-post-page';
import { getBlogPostSeo } from '@/features/blog/blog-seo';
import { buildLocalizedBlogPostPath } from '@/lib/seo/alternates';
import { createPageMetadata } from '@/lib/seo/metadata';

type BlogPostRouteProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export const generateStaticParams = async () => {
  const params: Array<{ locale: Locale; slug: string }> = [];

  for (const locale of locales) {
    const slugs = await getBlogPostSlugs(locale);

    for (const slug of slugs) {
      params.push({ locale, slug });
    }
  }

  return params;
};

export const generateMetadata = async ({ params }: BlogPostRouteProps): Promise<Metadata> => {
  const { locale: localeParam, slug } = await params;

  if (!isLocale(localeParam)) {
    return {};
  }

  const seo = await getBlogPostSeo(localeParam, slug);

  if (!seo) {
    return {};
  }

  return createPageMetadata({
    locale: localeParam,
    pathname: buildLocalizedBlogPostPath(localeParam, slug),
    title: seo.title,
    description: seo.description,
    keywords: siteKeywords,
  });
};

export default async function BlogPostRoute({ params }: BlogPostRouteProps) {
  const { locale: localeParam, slug } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale: Locale = localeParam;

  return <BlogPostPage locale={locale} slug={slug} />;
}
