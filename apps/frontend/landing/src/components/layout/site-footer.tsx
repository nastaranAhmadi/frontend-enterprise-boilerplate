import Link from 'next/link';

import { buildLocalizedPath } from '@/config/routes';
import type { Locale } from '@/config/site';

type SiteFooterProps = {
  locale: Locale;
  labels: {
    copyright: string;
    terms: string;
    contact: string;
  };
};

export const SiteFooter = ({ locale, labels }: SiteFooterProps) => {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-background">
      <div className="mx-auto flex max-w-6xl flex-col gap-md px-md py-lg md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-muted">{labels.copyright.replace('{year}', String(year))}</p>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-md">
            <li>
              <Link
                href={buildLocalizedPath(locale, 'terms')}
                className="text-sm text-muted transition-colors hover:text-foreground"
              >
                {labels.terms}
              </Link>
            </li>
            <li>
              <Link
                href={buildLocalizedPath(locale, 'contact')}
                className="text-sm text-muted transition-colors hover:text-foreground"
              >
                {labels.contact}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};
