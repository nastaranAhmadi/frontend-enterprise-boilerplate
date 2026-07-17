import { ContentPage } from '@/components/layout/content-page';
import { FaqPageJsonLd } from '@/components/seo/faq-page-json-ld';
import type { Locale } from '@/config/site';
import { createT } from '@/i18n/t';
import { createBreadcrumbs } from '@/lib/seo/breadcrumbs';
import type { FaqItem } from '@/lib/seo/json-ld';

type FaqItemKey = 'stack' | 'i18n' | 'data' | 'performance';

const faqItemKeys: FaqItemKey[] = ['stack', 'i18n', 'data', 'performance'];

type FaqPageProps = {
  locale: Locale;
};

export const FaqPage = ({ locale }: FaqPageProps) => {
  const t = createT(locale);
  const breadcrumbs = createBreadcrumbs(locale, [
    { label: t('navigation.home'), route: 'home' },
    { label: t('faq.title'), route: 'faq' },
  ]);

  const faqItems: FaqItem[] = faqItemKeys.map((key) => ({
    question: t(`faq.items.${key}.question`),
    answer: t(`faq.items.${key}.answer`),
  }));

  return (
    <ContentPage
      title={t('faq.title')}
      description={t('faq.description')}
      breadcrumbs={breadcrumbs}
    >
      <FaqPageJsonLd items={faqItems} />
      <div className="flex flex-col gap-md">
        {faqItemKeys.map((key) => (
          <details
            key={key}
            className="group rounded-lg border border-border bg-background px-md py-sm open:pb-md"
          >
            <summary className="cursor-pointer list-none py-sm text-base font-medium text-foreground marker:content-none [&::-webkit-details-marker]:hidden">
              {t(`faq.items.${key}.question`)}
            </summary>
            <p className="text-sm text-muted-foreground">{t(`faq.items.${key}.answer`)}</p>
          </details>
        ))}
      </div>
    </ContentPage>
  );
};
