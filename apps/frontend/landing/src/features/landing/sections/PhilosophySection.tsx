'use client';

import Image from 'next/image';

import type { Locale } from '@/config/site';
import { homeImages } from '@/features/landing/data/home-content';
import { useRevealOnScroll } from '@/features/landing/hooks/use-reveal-on-scroll';
import { createT } from '@/i18n/t';

type PhilosophySectionProps = {
  locale: Locale;
};

export const PhilosophySection = ({ locale }: PhilosophySectionProps) => {
  const t = createT(locale);
  const { ref, visible } = useRevealOnScroll();

  return (
    <section id="philosophy" className="scroll-mt-24 px-md py-2xl md:py-3xl">
      <div
        ref={ref}
        className={`mx-auto grid max-w-6xl items-center gap-xl lg:grid-cols-2 transition-all duration-700 motion-reduce:transition-none ${
          visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
        }`}
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
          <Image
            src={homeImages.philosophy}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div>
          <h2 className="text-3xl text-foreground md:text-4xl">{t('home.philosophy.title')}</h2>
          <p className="mt-md text-lg leading-relaxed text-muted-foreground">
            {t('home.philosophy.body')}
          </p>
          <p className="mt-lg text-xl italic text-secondary">{t('home.philosophy.quote')}</p>
        </div>
      </div>
    </section>
  );
};
