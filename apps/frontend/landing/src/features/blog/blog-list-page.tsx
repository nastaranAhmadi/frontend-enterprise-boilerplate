import { getBlogPosts } from '@/application/blog/get-blog-posts';
import { ContentPage } from '@/components/layout/content-page';
import type { Locale } from '@/config/site';
import { BlogCard } from '@/features/blog/components/blog-card';
import { getDictionary } from '@/i18n/get-dictionary';
import { createBreadcrumbs } from '@/lib/seo/breadcrumbs';

type BlogListPageProps = {
  locale: Locale;
};

export const BlogListPage = async ({ locale }: BlogListPageProps) => {
  const dictionary = getDictionary(locale);
  const posts = await getBlogPosts(locale);
  const breadcrumbs = createBreadcrumbs(locale, [
    { label: dictionary.navigation.home, route: 'home' },
    { label: dictionary.blog.title, route: 'blog' },
  ]);

  return (
    <ContentPage
      title={dictionary.blog.title}
      description={dictionary.blog.description}
      breadcrumbs={breadcrumbs}
    >
      {posts.length === 0 ? (
        <p className="text-muted">{dictionary.blog.empty}</p>
      ) : (
        <ul className="flex flex-col gap-md">
          {posts.map((post) => (
            <li key={post.slug}>
              <BlogCard locale={locale} post={post} readMoreLabel={dictionary.blog.readMore} />
            </li>
          ))}
        </ul>
      )}
    </ContentPage>
  );
};
