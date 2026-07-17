import { ContentPage } from '@/components/layout/content-page';
import type { Locale } from '@/config/site';
import { ContactForm } from '@/features/contact/components/contact-form';
import type { ContactFormLabels } from '@/features/contact/contact-form.types';
import { createT } from '@/i18n/t';
import { createBreadcrumbs } from '@/lib/seo/breadcrumbs';

type ContactPageProps = {
  locale: Locale;
};

const getContactFormLabels = (locale: Locale): ContactFormLabels => {
  const t = createT(locale);

  return {
    name: t('contact.form.name'),
    namePlaceholder: t('contact.form.namePlaceholder'),
    email: t('contact.form.email'),
    emailPlaceholder: t('contact.form.emailPlaceholder'),
    message: t('contact.form.message'),
    messagePlaceholder: t('contact.form.messagePlaceholder'),
    submit: t('contact.form.submit'),
    submitting: t('contact.form.submitting'),
    validation: {
      nameRequired: t('contact.form.validation.nameRequired'),
      emailRequired: t('contact.form.validation.emailRequired'),
      emailInvalid: t('contact.form.validation.emailInvalid'),
      messageRequired: t('contact.form.validation.messageRequired'),
    },
    success: t('contact.form.success'),
    error: t('contact.form.error'),
  };
};

export const ContactPage = ({ locale }: ContactPageProps) => {
  const t = createT(locale);
  const breadcrumbs = createBreadcrumbs(locale, [
    { label: t('navigation.home'), route: 'home' },
    { label: t('contact.title'), route: 'contact' },
  ]);

  return (
    <ContentPage
      title={t('contact.title')}
      description={t('contact.description')}
      breadcrumbs={breadcrumbs}
    >
      <ContactForm labels={getContactFormLabels(locale)} />
    </ContentPage>
  );
};
