import type { ReactNode } from 'react';

import type { Locale } from '@/config/site';

import { SiteFooter } from './site-footer';
import { SiteHeader } from './site-header';

type SiteShellProps = {
  locale: Locale;
  children: ReactNode;
};

export const SiteShell = ({ locale, children }: SiteShellProps) => (
  <div className="flex min-h-screen flex-col">
    <SiteHeader locale={locale} />
    {children}
    <SiteFooter locale={locale} />
  </div>
);
