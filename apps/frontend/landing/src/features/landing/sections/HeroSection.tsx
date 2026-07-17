import Image from 'next/image';

import { ButtonLink } from '@/components/chrome/button-link';
import { buildLocalizedPath } from '@/config/routes';
import type { Locale } from '@/config/site';
import { homeImages } from '@/features/landing/data/home-content';
import { createT } from '@/i18n/t';

type HeroSectionProps = {
  locale: Locale;
};

export const HeroSection = ({ locale }: HeroSectionProps) => {
  const t = createT(locale);

  return (
    <section className="relative overflow-hidden">
      <div className="relative min-h-[32rem] lg:min-h-0 lg:grid lg:grid-cols-2 lg:items-center">
        <div className="relative z-10 flex flex-col justify-center px-md py-2xl lg:px-xl lg:py-3xl">
          <p className="animate-fade-in-up text-xs font-medium uppercase tracking-[0.2em] text-secondary">
            {t('home.hero.eyebrow')}
          </p>
          <h1
            className="animate-fade-in-up mt-md font-serif text-4xl leading-tight text-foreground md:text-5xl lg:text-6xl"
            style={{ animationDelay: '80ms' }}
          >
            {t('home.hero.title')}
          </h1>
          <p
            className="animate-fade-in-up mt-md max-w-xl text-lg text-muted-foreground"
            style={{ animationDelay: '160ms' }}
          >
            {t('home.hero.description')}
          </p>
          <div
            className="animate-fade-in-up mt-xl flex flex-col gap-sm sm:flex-row sm:items-center"
            style={{ animationDelay: '240ms' }}
          >
            <ButtonLink
              href={buildLocalizedPath(locale, 'menu')}
              variant="filled"
              className="px-lg"
            >
              {t('home.hero.exploreMenu')}
            </ButtonLink>
            <ButtonLink
              href={buildLocalizedPath(locale, 'contact')}
              variant="outlined"
              className="px-lg"
            >
              {t('home.hero.reserve')}
            </ButtonLink>
          </div>
        </div>

        <div className="absolute inset-0 lg:relative lg:min-h-[38rem]">
          <Image
            src={homeImages.hero}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20 lg:bg-gradient-to-r lg:from-background lg:via-background/30 lg:to-transparent" />
        </div>
      </div>
    </section>
  );
};
