import { buildArticleSchema } from '@/lib/seo/json-ld';

import { JsonLd } from './json-ld';

type ArticleJsonLdProps = {
  title: string;
  description: string;
  publishedAt: string;
  url: string;
};

export const ArticleJsonLd = ({ title, description, publishedAt, url }: ArticleJsonLdProps) => (
  <JsonLd data={buildArticleSchema({ title, description, publishedAt, url })} />
);
