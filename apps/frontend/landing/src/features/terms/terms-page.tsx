import { ContentPage } from '@/components/layout/content-page';
import type { Locale } from '@/config/site';
import { getDictionary } from '@/i18n/get-dictionary';
import { createBreadcrumbs } from '@/lib/seo/breadcrumbs';

type TermsSectionKey = 'acceptance' | 'use' | 'liability' | 'changes';

const sectionKeys: TermsSectionKey[] = ['acceptance', 'use', 'liability', 'changes'];

type TermsPageProps = {
  locale: Locale;
};

export const TermsPage = ({ locale }: TermsPageProps) => {
  const dictionary = getDictionary(locale);
  const breadcrumbs = createBreadcrumbs(locale, [
    { label: dictionary.navigation.home, route: 'home' },
    { label: dictionary.terms.title, route: 'terms' },
  ]);

  return (
    <ContentPage
      title={dictionary.terms.title}
      description={dictionary.terms.description}
      breadcrumbs={breadcrumbs}
    >
      <div className="flex flex-col gap-xl">
        {sectionKeys.map((key) => {
          const section = dictionary.terms.sections[key];

          return (
            <section key={key} aria-labelledby={`terms-${key}`}>
              <h2 id={`terms-${key}`} className="text-xl font-medium text-foreground">
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
