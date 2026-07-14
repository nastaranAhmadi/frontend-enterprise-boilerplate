import { ContentPage } from '@/components/layout/content-page';
import type { Locale } from '@/config/site';
import { getDictionary } from '@/i18n/get-dictionary';
import { createBreadcrumbs } from '@/lib/seo/breadcrumbs';

type AboutSectionKey = 'mission' | 'approach' | 'values';

const sectionKeys: AboutSectionKey[] = ['mission', 'approach', 'values'];

type AboutPageProps = {
  locale: Locale;
};

export const AboutPage = ({ locale }: AboutPageProps) => {
  const dictionary = getDictionary(locale);
  const breadcrumbs = createBreadcrumbs(locale, [
    { label: dictionary.navigation.home, route: 'home' },
    { label: dictionary.about.title, route: 'about' },
  ]);

  return (
    <ContentPage
      title={dictionary.about.title}
      description={dictionary.about.description}
      breadcrumbs={breadcrumbs}
    >
      <div className="flex flex-col gap-xl">
        {sectionKeys.map((key) => {
          const section = dictionary.about.sections[key];

          return (
            <section key={key} aria-labelledby={`about-${key}`}>
              <h2 id={`about-${key}`} className="text-xl font-medium text-foreground">
                {section.title}
              </h2>
              <p className="mt-sm text-muted-foreground">{section.body}</p>
            </section>
          );
        })}
      </div>
    </ContentPage>
  );
};
