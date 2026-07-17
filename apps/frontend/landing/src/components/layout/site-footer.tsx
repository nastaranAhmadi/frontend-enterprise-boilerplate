import Link from 'next/link';

import { buildLocalizedPath } from '@/config/routes';
import type { Locale } from '@/config/site';
import { createT } from '@/i18n/t';

type SiteFooterProps = {
  locale: Locale;
};

export const SiteFooter = ({ locale }: SiteFooterProps) => {
  const t = createT(locale);
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-background">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-lg px-md py-xl text-center">
        <p className="font-serif text-lg tracking-[0.2em] text-foreground">
          {t('common.siteName')}
        </p>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap justify-center gap-md">
            <li>
              <Link
                href={buildLocalizedPath(locale, 'terms')}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {t('footer.terms')}
              </Link>
            </li>
            <li>
              <Link
                href={buildLocalizedPath(locale, 'contact')}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {t('footer.contact')}
              </Link>
            </li>
          </ul>
        </nav>
        <p className="text-sm text-muted-foreground">
          {t('footer.copyright').replace('{year}', String(year))}
        </p>
      </div>
    </footer>
  );
};
