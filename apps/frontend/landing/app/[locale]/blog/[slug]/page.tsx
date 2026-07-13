import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getBlogPost } from '@/application/blog/get-blog-post';
import { getBlogPosts } from '@/application/blog/get-blog-posts';
import { siteKeywords } from '@/config/seo';
import { isLocale, type Locale, locales } from '@/config/site';
import { BlogPostPage } from '@/features/blog/blog-post-page';
import { buildLocalizedBlogPostPath } from '@/lib/seo/alternates';
import { createPageMetadata } from '@/lib/seo/metadata';

type BlogPostRouteProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export const generateStaticParams = async () => {
  const params: Array<{ locale: Locale; slug: string }> = [];

  for (const locale of locales) {
    const posts = await getBlogPosts(locale);

    for (const post of posts) {
      params.push({ locale, slug: post.slug });
    }
  }

  return params;
};

export const generateMetadata = async ({ params }: BlogPostRouteProps): Promise<Metadata> => {
  const { locale: localeParam, slug } = await params;

  if (!isLocale(localeParam)) {
    return {};
  }

  const post = await getBlogPost(localeParam, slug);

  if (!post) {
    return {};
  }

  return createPageMetadata({
    locale: localeParam,
    pathname: buildLocalizedBlogPostPath(localeParam, post.slug),
    title: post.title,
    description: post.excerpt,
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
