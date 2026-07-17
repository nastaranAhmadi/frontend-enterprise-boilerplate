import { notFound } from 'next/navigation';

import { getBlogPost } from '@/application/blog/get-blog-post';
import { ContentPage } from '@/components/layout/content-page';
import { ArticleJsonLd } from '@/components/seo/article-json-ld';
import type { Locale } from '@/config/site';
import { createT } from '@/i18n/t';
import { formatPublishedDate } from '@/lib/i18n/format-date';
import { buildAbsoluteUrl, buildLocalizedBlogPostPath } from '@/lib/seo/alternates';
import { createBreadcrumbs } from '@/lib/seo/breadcrumbs';

type BlogPostPageProps = {
  locale: Locale;
  slug: string;
};

export const BlogPostPage = async ({ locale, slug }: BlogPostPageProps) => {
  const t = createT(locale);
  const post = await getBlogPost(locale, slug);

  if (!post) {
    notFound();
  }

  const pathname = buildLocalizedBlogPostPath(locale, post.slug);
  const breadcrumbs = createBreadcrumbs(locale, [
    { label: t('navigation.home'), route: 'home' },
    { label: t('blog.title'), route: 'blog' },
    { label: post.title, path: pathname },
  ]);

  return (
    <ContentPage title={post.title} description={post.excerpt} breadcrumbs={breadcrumbs}>
      <ArticleJsonLd
        title={post.title}
        description={post.excerpt}
        publishedAt={post.publishedAt}
        url={buildAbsoluteUrl(pathname)}
      />
      <article>
        <time className="text-sm text-muted-foreground" dateTime={post.publishedAt}>
          {formatPublishedDate(locale, post.publishedAt)}
        </time>
        <div className="mt-lg flex flex-col gap-md text-muted-foreground">
          {post.content.split('\n\n').map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </article>
    </ContentPage>
  );
};
