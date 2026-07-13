import type { ReactNode } from 'react';

import { BreadcrumbJsonLd } from '@/components/seo/breadcrumb-json-ld';
import type { BreadcrumbItem } from '@/lib/seo/json-ld';

type ContentPageProps = {
  title: string;
  description?: string;
  breadcrumbs: readonly BreadcrumbItem[];
  children: ReactNode;
};

export const ContentPage = ({ title, description, breadcrumbs, children }: ContentPageProps) => (
  <main id="main-content" className="mx-auto w-full max-w-3xl px-md py-xl">
    <BreadcrumbJsonLd items={breadcrumbs} />
    <header className="mb-xl flex flex-col gap-sm">
      <h1 className="text-3xl font-medium tracking-tight md:text-4xl">{title}</h1>
      {description ? <p className="text-lg text-muted">{description}</p> : null}
    </header>
    {children}
  </main>
);
