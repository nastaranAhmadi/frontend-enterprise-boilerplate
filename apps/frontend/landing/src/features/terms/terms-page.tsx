import { ContentPage } from '@/components/layout/content-page';
import type { Locale } from '@/config/site';
import { createT } from '@/i18n/t';
import { createBreadcrumbs } from '@/lib/seo/breadcrumbs';

type TermsSectionKey = 'acceptance' | 'use' | 'liability' | 'changes';

const sectionKeys: TermsSectionKey[] = ['acceptance', 'use', 'liability', 'changes'];

type TermsPageProps = {
  locale: Locale;
};

export const TermsPage = ({ locale }: TermsPageProps) => {
  const t = createT(locale);
  const breadcrumbs = createBreadcrumbs(locale, [
    { label: t('navigation.home'), route: 'home' },
    { label: t('terms.title'), route: 'terms' },
  ]);

  return (
    <ContentPage
      title={t('terms.title')}
      description={t('terms.description')}
      breadcrumbs={breadcrumbs}
    >
      <div className="flex flex-col gap-xl">
        {sectionKeys.map((key) => (
          <section key={key} aria-labelledby={`terms-${key}`}>
            <h2 id={`terms-${key}`} className="text-xl font-medium text-foreground">
              {t(`terms.sections.${key}.title`)}
            </h2>
            <p className="mt-sm text-muted-foreground">{t(`terms.sections.${key}.body`)}</p>
          </section>
        ))}
      </div>
    </ContentPage>
  );
};
