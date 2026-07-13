import { ContentPage } from '@/components/layout/content-page';
import type { Locale } from '@/config/site';
import { ContactForm } from '@/features/contact/components/contact-form';
import { getDictionary } from '@/i18n/get-dictionary';
import { createBreadcrumbs } from '@/lib/seo/breadcrumbs';

type ContactPageProps = {
  locale: Locale;
};

export const ContactPage = ({ locale }: ContactPageProps) => {
  const dictionary = getDictionary(locale);
  const breadcrumbs = createBreadcrumbs(locale, [
    { label: dictionary.navigation.home, route: 'home' },
    { label: dictionary.contact.title, route: 'contact' },
  ]);

  return (
    <ContentPage
      title={dictionary.contact.title}
      description={dictionary.contact.description}
      breadcrumbs={breadcrumbs}
    >
      <ContactForm labels={dictionary.contact.form} />
    </ContentPage>
  );
};
