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
    <section className="overflow-hidden bg-background">
      <div className="flex flex-col sm:grid sm:min-h-0 sm:grid-cols-2 sm:items-center">
        {/* Mobile: image on top. Desktop: right column. */}
        <div className="relative order-1 aspect-[4/3] w-full lg:order-2 lg:aspect-auto lg:min-h-[38rem]">
          <Image
            src={homeImages.hero}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-background via-background/30 to-transparent lg:block" />
        </div>

        {/* Mobile: copy below image. Desktop: left column. */}
        <div className="relative order-2 flex flex-col justify-center px-md py-xl lg:order-1 lg:px-xl lg:py-3xl">
          <p className="animate-fade-in-up text-xs font-medium uppercase tracking-[0.2em] text-secondary">
            {t('home.hero.eyebrow')}
          </p>
          <h1
            className="animate-fade-in-up mt-md text-4xl leading-tight text-foreground md:text-5xl lg:text-6xl"
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
            className="animate-fade-in-up mt-xl flex w-full flex-col gap-sm lg:w-auto lg:flex-row lg:items-center"
            style={{ animationDelay: '240ms' }}
          >
            <ButtonLink
              href={buildLocalizedPath(locale, 'menu')}
              variant="filled"
              className="w-full min-h-11 justify-center px-lg lg:w-auto"
            >
              {t('home.hero.exploreMenu')}
            </ButtonLink>
            <ButtonLink
              href={buildLocalizedPath(locale, 'contact')}
              variant="outlined"
              className="w-full min-h-11 justify-center px-lg lg:w-auto"
            >
              {t('home.hero.reserve')}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
};
