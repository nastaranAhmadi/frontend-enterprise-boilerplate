import { ButtonLink } from '@/components/chrome/button-link';
import { buildLocalizedPath } from '@/config/routes';
import type { Locale } from '@/config/site';
import { getDictionary } from '@/i18n/get-dictionary';

type CtaSectionProps = {
  locale: Locale;
};

export const CtaSection = ({ locale }: CtaSectionProps) => {
  const dictionary = getDictionary(locale);
  const { title, description, primary, secondary } = dictionary.home.ctaSection;

  return (
    <section aria-labelledby="cta-heading" className="mx-auto w-full max-w-6xl px-md py-xl">
      <div className="flex flex-col items-center gap-md rounded-xl border border-border bg-background px-md py-xl text-center md:px-xl">
        <h2 id="cta-heading" className="text-2xl font-medium tracking-tight md:text-3xl">
          {title}
        </h2>
        <p className="max-w-2xl text-muted-foreground">{description}</p>
        <div className="flex flex-wrap items-center justify-center gap-sm">
          <ButtonLink href={buildLocalizedPath(locale, 'contact')}>{primary}</ButtonLink>
          <ButtonLink href={buildLocalizedPath(locale, 'about')} variant="outlined">
            {secondary}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
};
