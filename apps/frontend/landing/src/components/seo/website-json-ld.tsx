import type { Locale } from '@/config/site';
import { buildWebSiteSchema } from '@/lib/seo/json-ld';

import { JsonLd } from './json-ld';

type WebSiteJsonLdProps = {
  locale: Locale;
};

export const WebSiteJsonLd = ({ locale }: WebSiteJsonLdProps) => (
  <JsonLd data={buildWebSiteSchema(locale)} />
);
