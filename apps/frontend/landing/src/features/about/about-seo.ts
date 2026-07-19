import { getAboutPage } from '@/application/about/get-about-page';
import type { Locale } from '@/config/site';
import { extractHtmlDescription, extractHtmlTitle } from '@/features/blog/extract-blog-body-html';

export type AboutSeo = {
  title: string;
  description: string;
};

/** Mirrors CMS `<head>` into Next `generateMetadata` — not a content model. */
export const getAboutSeo = async (locale: Locale): Promise<AboutSeo> => {
  const page = await getAboutPage(locale);

  return {
    title: extractHtmlTitle(page.content, 'About'),
    description: extractHtmlDescription(page.content),
  };
};
