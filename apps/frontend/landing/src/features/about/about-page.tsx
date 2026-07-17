import { ContentPage } from '@/components/layout/content-page';
import type { Locale } from '@/config/site';
import { createT } from '@/i18n/t';
import { createBreadcrumbs } from '@/lib/seo/breadcrumbs';

type AboutSectionKey = 'mission' | 'approach' | 'values';

const sectionKeys: AboutSectionKey[] = ['mission', 'approach', 'values'];

type AboutPageProps = {
  locale: Locale;
};

export const AboutPage = ({ locale }: AboutPageProps) => {
  const t = createT(locale);
  const breadcrumbs = createBreadcrumbs(locale, [
    { label: t('navigation.home'), route: 'home' },
    { label: t('about.title'), route: 'about' },
  ]);

  return (
    <ContentPage
      title={t('about.title')}
      description={t('about.description')}
      breadcrumbs={breadcrumbs}
    >
      <div className="flex flex-col gap-xl">
        {sectionKeys.map((key) => (
          <section key={key} aria-labelledby={`about-${key}`}>
            <h2 id={`about-${key}`} className="text-xl font-medium text-foreground">
              {t(`about.sections.${key}.title`)}
            </h2>
            <p className="mt-sm text-muted-foreground">{t(`about.sections.${key}.body`)}</p>
          </section>
        ))}
      </div>
    </ContentPage>
  );
};
