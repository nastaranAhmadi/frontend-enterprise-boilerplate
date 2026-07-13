import { ButtonLink } from '@/components/chrome/button-link';
import { buildLocalizedPath } from '@/config/routes';
import type { Locale } from '@/config/site';
import { getDictionary } from '@/i18n/get-dictionary';

type HeroSectionProps = {
  locale: Locale;
};

export const HeroSection = ({ locale }: HeroSectionProps) => {
  const dictionary = getDictionary(locale);

  return (
    <section
      aria-labelledby="hero-heading"
      className="mx-auto w-full max-w-6xl px-md py-xl md:py-2xl"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-md text-center">
        <h1 id="hero-heading" className="text-3xl font-medium tracking-tight md:text-5xl">
          {dictionary.home.title}
        </h1>
        <p className="max-w-2xl text-lg text-muted md:text-xl">{dictionary.home.description}</p>
        <ButtonLink href={buildLocalizedPath(locale, 'contact')} className="mt-sm">
          {dictionary.home.cta}
        </ButtonLink>
      </div>
    </section>
  );
};
