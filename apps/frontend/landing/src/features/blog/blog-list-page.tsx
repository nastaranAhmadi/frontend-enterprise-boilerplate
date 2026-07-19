import { getBlogIndexPage } from '@/application/blog/get-blog-posts';
import type { Locale } from '@/config/site';
import { extractBlogBodyHtml } from '@/features/blog/extract-blog-body-html';

type BlogListPageProps = {
  locale: Locale;
};

/** Renders CMS HTML for `/blog` — layout/styles come from `content`, not React. */
export const BlogListPage = async ({ locale }: BlogListPageProps) => {
  const page = await getBlogIndexPage(locale);

  return (
    <main
      id="main-content"
      className="w-full"
      dangerouslySetInnerHTML={{ __html: extractBlogBodyHtml(page.content) }}
    />
  );
};
