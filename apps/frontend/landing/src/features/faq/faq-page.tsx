import Link from 'next/link';

import { BreadcrumbJsonLd } from '@/components/seo/breadcrumb-json-ld';
import { FaqPageJsonLd } from '@/components/seo/faq-page-json-ld';
import { buildLocalizedPath } from '@/config/routes';
import type { Locale } from '@/config/site';
import { FaqAccordion } from '@/features/faq/faq-accordion';
import { createT } from '@/i18n/t';
import { createBreadcrumbs } from '@/lib/seo/breadcrumbs';
import type { FaqItem } from '@/lib/seo/json-ld';

type FaqItemKey = 'reservations' | 'dietary' | 'timing' | 'private';

const faqItemKeys: FaqItemKey[] = ['reservations', 'dietary', 'timing', 'private'];

type FaqPageProps = {
  locale: Locale;
};

export const FaqPage = ({ locale }: FaqPageProps) => {
  const t = createT(locale);
  const breadcrumbs = createBreadcrumbs(locale, [
    { label: t('navigation.home'), route: 'home' },
    { label: t('faq.title'), route: 'faq' },
  ]);

  const accordionItems = faqItemKeys.map((key) => ({
    id: key,
    question: t(`faq.items.${key}.question`),
    answer: t(`faq.items.${key}.answer`),
  }));

  const faqItems: FaqItem[] = accordionItems.map(({ question, answer }) => ({
    question,
    answer,
  }));

  return (
    <main id="main-content" className="w-full overflow-x-clip bg-background text-foreground">
      <BreadcrumbJsonLd items={breadcrumbs} />
      <FaqPageJsonLd items={faqItems} />

      <div className="mx-auto w-full max-w-3xl px-md py-xl sm:px-lg sm:py-2xl lg:py-3xl">
        <header className="animate-fade-in-up mb-xl motion-reduce:animate-none sm:mb-2xl">
          <p className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-warning">
            {t('faq.kicker')}
          </p>
          <h1
            id="faq-heading"
            className="mt-md font-[Georgia,'Times_New_Roman',serif] text-4xl font-medium leading-[1.05] tracking-[-0.03em] text-foreground md:text-5xl"
          >
            {t('faq.title')}
          </h1>
          <p className="mt-md max-w-xl text-lg text-muted-foreground">{t('faq.description')}</p>
        </header>

        <section
          className="animate-fade-in-up motion-reduce:animate-none"
          style={{ animationDelay: '80ms' }}
          aria-labelledby="faq-heading"
        >
          <FaqAccordion items={accordionItems} />
        </section>

        <p
          className="animate-fade-in-up mt-2xl border-t border-border pt-lg text-sm text-muted-foreground motion-reduce:animate-none"
          style={{ animationDelay: '140ms' }}
        >
          {t('faq.ctaBody')}{' '}
          <Link
            href={buildLocalizedPath(locale, 'contact')}
            className="font-medium text-foreground underline-offset-4 transition-colors duration-normal hover:text-secondary hover:underline"
          >
            {t('faq.ctaLabel')}
          </Link>
        </p>
      </div>
    </main>
  );
};
