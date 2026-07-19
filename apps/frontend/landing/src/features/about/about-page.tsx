import { getAboutPage } from '@/application/about/get-about-page';
import type { Locale } from '@/config/site';
import { extractBlogBodyHtml } from '@/features/blog/extract-blog-body-html';

type AboutPageProps = {
  locale: Locale;
};

/** Renders CMS HTML for `/about` — layout/styles come from `content`, not React. */
export const AboutPage = async ({ locale }: AboutPageProps) => {
  const page = await getAboutPage(locale);

  return (
    <main
      id="main-content"
      className="w-full"
      dangerouslySetInnerHTML={{ __html: extractBlogBodyHtml(page.content) }}
    />
  );
};
