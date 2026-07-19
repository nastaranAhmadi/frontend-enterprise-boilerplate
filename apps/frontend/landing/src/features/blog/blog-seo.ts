import { getBlogPost } from '@/application/blog/get-blog-post';
import { getBlogIndexPage } from '@/application/blog/get-blog-posts';
import type { Locale } from '@/config/site';
import { extractHtmlDescription, extractHtmlTitle } from '@/features/blog/extract-blog-body-html';

export type BlogSeo = {
  title: string;
  description: string;
};

/** Mirrors CMS `<head>` into Next `generateMetadata` — not a content model. */
const seoFromCmsContent = (content: string): BlogSeo => ({
  title: extractHtmlTitle(content),
  description: extractHtmlDescription(content),
});

export const getBlogIndexSeo = async (locale: Locale): Promise<BlogSeo> => {
  const page = await getBlogIndexPage(locale);
  return seoFromCmsContent(page.content);
};

export const getBlogPostSeo = async (locale: Locale, slug: string): Promise<BlogSeo | null> => {
  const post = await getBlogPost(locale, slug);

  if (!post) {
    return null;
  }

  return seoFromCmsContent(post.content);
};
