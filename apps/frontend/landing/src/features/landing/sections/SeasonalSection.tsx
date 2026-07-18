'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Chip,
} from '@enterprise/ui';
import Image from 'next/image';

import type { Locale } from '@/config/site';
import {
  seasonalImages,
  type SeasonalItemKey,
  seasonalItemKeys,
} from '@/features/landing/data/home-content';
import { useRevealOnScroll } from '@/features/landing/hooks/use-reveal-on-scroll';
import { createT } from '@/i18n/t';

type SeasonalSectionProps = {
  locale: Locale;
};

const SeasonalCard = ({
  locale,
  itemKey,
  index,
}: {
  locale: Locale;
  index: number;
  itemKey: SeasonalItemKey;
}) => {
  const t = createT(locale);
  const { ref, visible } = useRevealOnScroll();
  const prefix = `home.seasonal.items.${itemKey}`;

  return (
    <div
      ref={ref}
      className={`transition-all duration-500 motion-reduce:transition-none ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      }`}
      style={{ transitionDelay: `${String(index * 80)}ms` }}
    >
      <Card className="h-full overflow-hidden">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={seasonalImages[itemKey]}
            alt={t(`${prefix}.name`)}
            fill
            className="object-cover transition-transform duration-700 hover:scale-105 motion-reduce:transform-none"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <CardHeader>
          <CardTitle className="text-xl">{t(`${prefix}.name`)}</CardTitle>
          <CardDescription>{t(`${prefix}.description`)}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-xs">
            {t.strings(`${prefix}.ingredients`).map((ingredient) => (
              <Chip key={ingredient} size="small" color="secondary" variant="outlined">
                {ingredient}
              </Chip>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <span className="text-sm font-medium text-foreground">{t(`${prefix}.price`)}</span>
        </CardFooter>
      </Card>
    </div>
  );
};

export const SeasonalSection = ({ locale }: SeasonalSectionProps) => {
  const t = createT(locale);
  const { ref, visible } = useRevealOnScroll();

  return (
    <section id="seasonal" className="scroll-mt-24 bg-surface px-md py-2xl md:py-3xl">
      <div className="mx-auto max-w-6xl">
        <div
          ref={ref}
          className={`mb-xl max-w-2xl transition-all duration-700 motion-reduce:transition-none ${
            visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          <h2 className="text-3xl text-foreground md:text-4xl">{t('home.seasonal.title')}</h2>
          <p className="mt-sm text-muted-foreground">{t('home.seasonal.subtitle')}</p>
        </div>

        <div className="grid gap-lg sm:grid-cols-2 lg:grid-cols-3">
          {seasonalItemKeys.map((itemKey, index) => (
            <SeasonalCard key={itemKey} locale={locale} itemKey={itemKey} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
