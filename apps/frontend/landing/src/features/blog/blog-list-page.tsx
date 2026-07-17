import { getBlogPosts } from '@/application/blog/get-blog-posts';
import { ContentPage } from '@/components/layout/content-page';
import type { Locale } from '@/config/site';
import { BlogCard } from '@/features/blog/components/blog-card';
import { createT } from '@/i18n/t';
import { createBreadcrumbs } from '@/lib/seo/breadcrumbs';

type BlogListPageProps = {
  locale: Locale;
};

export const BlogListPage = async ({ locale }: BlogListPageProps) => {
  const t = createT(locale);
  const posts = await getBlogPosts(locale);
  const breadcrumbs = createBreadcrumbs(locale, [
    { label: t('navigation.home'), route: 'home' },
    { label: t('blog.title'), route: 'blog' },
  ]);

  return (
    <ContentPage
      title={t('blog.title')}
      description={t('blog.description')}
      breadcrumbs={breadcrumbs}
    >
      {posts.length === 0 ? (
        <p className="text-muted-foreground">{t('blog.empty')}</p>
      ) : (
        <ul className="flex flex-col gap-md">
          {posts.map((post) => (
            <li key={post.slug}>
              <BlogCard locale={locale} post={post} readMoreLabel={t('blog.readMore')} />
            </li>
          ))}
        </ul>
      )}
    </ContentPage>
  );
};
