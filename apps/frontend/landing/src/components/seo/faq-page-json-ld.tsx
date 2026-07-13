import { buildFaqPageSchema, type FaqItem } from '@/lib/seo/json-ld';

import { JsonLd } from './json-ld';

type FaqPageJsonLdProps = {
  items: readonly FaqItem[];
};

export const FaqPageJsonLd = ({ items }: FaqPageJsonLdProps) => (
  <JsonLd data={buildFaqPageSchema(items)} />
);
