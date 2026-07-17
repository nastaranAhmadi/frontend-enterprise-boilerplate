'use client';

import { Button } from '@enterprise/ui/button';
import { usePathname } from 'next/navigation';

import { ButtonLink } from '@/components/chrome/button-link';
import { buildLocalizedPath } from '@/config/routes';
import { createT } from '@/i18n/t';
import { resolveLocaleFromPathname } from '@/lib/i18n/resolve-locale-from-pathname';

type LocalizedErrorContentProps = {
  onRetry?: () => void;
};

export const LocalizedErrorContent = ({ onRetry }: LocalizedErrorContentProps) => {
  const pathname = usePathname();
  const locale = resolveLocaleFromPathname(pathname);
  const t = createT(locale);

  return (
    <main
      id="main-content"
      className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center gap-md px-md py-xl text-center"
    >
      <h1 className="text-2xl font-medium">{t('errors.title')}</h1>
      <p className="text-muted-foreground">{t('errors.description')}</p>
      {onRetry ? (
        <Button type="button" onClick={onRetry}>
          {t('errors.retry')}
        </Button>
      ) : null}
    </main>
  );
};

export const LocalizedNotFoundContent = () => {
  const pathname = usePathname();
  const locale = resolveLocaleFromPathname(pathname);
  const t = createT(locale);

  return (
    <main
      id="main-content"
      className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center gap-md px-md py-xl text-center"
    >
      <h1 className="text-2xl font-medium">{t('errors.notFoundTitle')}</h1>
      <p className="text-muted-foreground">{t('errors.notFoundDescription')}</p>
      <ButtonLink href={buildLocalizedPath(locale, 'home')}>{t('errors.goHome')}</ButtonLink>
    </main>
  );
};
