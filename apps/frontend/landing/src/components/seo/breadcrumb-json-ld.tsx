import { type BreadcrumbItem, buildBreadcrumbSchema } from '@/lib/seo/json-ld';

import { JsonLd } from './json-ld';

type BreadcrumbJsonLdProps = {
  items: readonly BreadcrumbItem[];
};

export const BreadcrumbJsonLd = ({ items }: BreadcrumbJsonLdProps) => (
  <JsonLd data={buildBreadcrumbSchema(items)} />
);
