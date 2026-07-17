'use client';

import { Card, CardContent } from '@enterprise/ui';

import type { Locale } from '@/config/site';
import { type ExperienceKey, experienceKeys } from '@/features/landing/data/home-content';
import { useRevealOnScroll } from '@/features/landing/hooks/use-reveal-on-scroll';
import { createT } from '@/i18n/t';

type GuestExperiencesSectionProps = {
  locale: Locale;
};

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5" aria-label={`${String(rating)} out of 5 stars`}>
    {Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        aria-hidden="true"
        className={index < rating ? 'text-secondary' : 'text-muted'}
      >
        ★
      </span>
    ))}
  </div>
);

const ExperienceCard = ({
  locale,
  itemKey,
  index,
}: {
  locale: Locale;
  index: number;
  itemKey: ExperienceKey;
}) => {
  const t = createT(locale);
  const { ref, visible } = useRevealOnScroll();
  const prefix = `home.experiences.items.${itemKey}`;

  return (
    <div
      ref={ref}
      className={`h-full transition-all duration-500 motion-reduce:transition-none ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      }`}
      style={{ transitionDelay: `${String(index * 100)}ms` }}
    >
      <Card variant="elevated" className="h-full">
        <CardContent className="flex h-full flex-col gap-md pt-lg">
          <StarRating rating={t.number(`${prefix}.rating`)} />
          <blockquote className="flex-1 font-serif text-lg leading-relaxed text-foreground">
            “{t(`${prefix}.quote`)}”
          </blockquote>
          <div>
            <p className="font-medium text-foreground">{t(`${prefix}.name`)}</p>
            <p className="text-sm text-muted-foreground">{t(`${prefix}.role`)}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export const GuestExperiencesSection = ({ locale }: GuestExperiencesSectionProps) => {
  const t = createT(locale);
  const { ref, visible } = useRevealOnScroll();

  return (
    <section id="experiences" className="scroll-mt-24 bg-surface px-md py-2xl md:py-3xl">
      <div className="mx-auto max-w-6xl">
        <div
          ref={ref}
          className={`mb-xl text-center transition-all duration-700 motion-reduce:transition-none ${
            visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          <h2 className="font-serif text-3xl text-foreground md:text-4xl">
            {t('home.experiences.title')}
          </h2>
          <p className="mt-sm text-muted-foreground">{t('home.experiences.subtitle')}</p>
        </div>

        <div className="grid gap-lg md:grid-cols-3">
          {experienceKeys.map((itemKey, index) => (
            <ExperienceCard key={itemKey} locale={locale} itemKey={itemKey} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
