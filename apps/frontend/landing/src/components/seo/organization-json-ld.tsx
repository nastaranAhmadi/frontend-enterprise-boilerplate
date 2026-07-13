import type { Locale } from '@/config/site';
import { buildOrganizationSchema } from '@/lib/seo/json-ld';

import { JsonLd } from './json-ld';

type OrganizationJsonLdProps = {
  locale: Locale;
};

export const OrganizationJsonLd = ({ locale }: OrganizationJsonLdProps) => (
  <JsonLd data={buildOrganizationSchema(locale)} />
);
