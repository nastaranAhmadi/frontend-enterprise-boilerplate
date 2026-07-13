import { ContentPage } from '@/components/layout/content-page';
import { FaqPageJsonLd } from '@/components/seo/faq-page-json-ld';
import type { Locale } from '@/config/site';
import { getDictionary } from '@/i18n/get-dictionary';
import { createBreadcrumbs } from '@/lib/seo/breadcrumbs';
import type { FaqItem } from '@/lib/seo/json-ld';

type FaqItemKey = 'stack' | 'i18n' | 'data' | 'performance';

const faqItemKeys: FaqItemKey[] = ['stack', 'i18n', 'data', 'performance'];

type FaqPageProps = {
  locale: Locale;
};

export const FaqPage = ({ locale }: FaqPageProps) => {
  const dictionary = getDictionary(locale);
  const breadcrumbs = createBreadcrumbs(locale, [
    { label: dictionary.navigation.home, route: 'home' },
    { label: dictionary.faq.title, route: 'faq' },
  ]);

  const faqItems: FaqItem[] = faqItemKeys.map((key) => {
    const item = dictionary.faq.items[key];
    return {
      question: item.question,
      answer: item.answer,
    };
  });

  return (
    <ContentPage
      title={dictionary.faq.title}
      description={dictionary.faq.description}
      breadcrumbs={breadcrumbs}
    >
      <FaqPageJsonLd items={faqItems} />
      <div className="flex flex-col gap-md">
        {faqItemKeys.map((key) => {
          const item = dictionary.faq.items[key];

          return (
            <details
              key={key}
              className="group rounded-lg border border-border bg-background px-md py-sm open:pb-md"
            >
              <summary className="cursor-pointer list-none py-sm text-base font-medium text-foreground marker:content-none [&::-webkit-details-marker]:hidden">
                {item.question}
              </summary>
              <p className="text-sm text-muted">{item.answer}</p>
            </details>
          );
        })}
      </div>
    </ContentPage>
  );
};
