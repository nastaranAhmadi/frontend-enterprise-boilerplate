'use client';

import { Button } from '@enterprise/ui/button';
import { usePathname } from 'next/navigation';

import { ButtonLink } from '@/components/chrome/button-link';
import { buildLocalizedPath } from '@/config/routes';
import { getErrorLabels } from '@/i18n/get-error-labels';
import { resolveLocaleFromPathname } from '@/lib/i18n/resolve-locale-from-pathname';

type LocalizedErrorContentProps = {
  onRetry?: () => void;
};

export const LocalizedErrorContent = ({ onRetry }: LocalizedErrorContentProps) => {
  const pathname = usePathname();
  const locale = resolveLocaleFromPathname(pathname);
  const labels = getErrorLabels(locale);

  return (
    <main
      id="main-content"
      className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center gap-md px-md py-xl text-center"
    >
      <h1 className="text-2xl font-medium">{labels.title}</h1>
      <p className="text-muted">{labels.description}</p>
      {onRetry ? (
        <Button type="button" onClick={onRetry}>
          {labels.retry}
        </Button>
      ) : null}
    </main>
  );
};

export const LocalizedNotFoundContent = () => {
  const pathname = usePathname();
  const locale = resolveLocaleFromPathname(pathname);
  const labels = getErrorLabels(locale);

  return (
    <main
      id="main-content"
      className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center gap-md px-md py-xl text-center"
    >
      <h1 className="text-2xl font-medium">{labels.notFoundTitle}</h1>
      <p className="text-muted">{labels.notFoundDescription}</p>
      <ButtonLink href={buildLocalizedPath(locale, 'home')}>{labels.goHome}</ButtonLink>
    </main>
  );
};
