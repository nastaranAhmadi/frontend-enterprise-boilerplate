import { notFound } from 'next/navigation';

import { getBlogPost } from '@/application/blog/get-blog-post';
import type { Locale } from '@/config/site';
import { extractBlogBodyHtml } from '@/features/blog/extract-blog-body-html';

type BlogPostPageProps = {
  locale: Locale;
  slug: string;
};

/** Renders CMS HTML for `/blog/[slug]` — layout/styles come from `content`, not React. */
export const BlogPostPage = async ({ locale, slug }: BlogPostPageProps) => {
  const post = await getBlogPost(locale, slug);

  if (!post) {
    notFound();
  }

  return (
    <main
      id="main-content"
      className="w-full"
      dangerouslySetInnerHTML={{ __html: extractBlogBodyHtml(post.content) }}
    />
  );
};
