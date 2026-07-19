import Image from 'next/image';

import { BreadcrumbJsonLd } from '@/components/seo/breadcrumb-json-ld';
import type { Locale } from '@/config/site';
import { ContactForm } from '@/features/contact/components/contact-form';
import type { ContactFormLabels } from '@/features/contact/contact-form.types';
import { homeImages } from '@/features/landing/data/home-content';
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

const displayClassName =
  "font-[Georgia,'Times_New_Roman',serif] font-medium leading-[1.05] tracking-[-0.03em]";

export const ContactPage = ({ locale }: ContactPageProps) => {
  const t = createT(locale);
  const breadcrumbs = createBreadcrumbs(locale, [
    { label: t('navigation.home'), route: 'home' },
    { label: t('contact.title'), route: 'contact' },
  ]);

  const phone = t('home.visit.phone');
  const email = t('home.visit.email');
  const address = t('home.visit.address');

  return (
    <main id="main-content" className="w-full overflow-x-clip bg-background text-foreground">
      <BreadcrumbJsonLd items={breadcrumbs} />

      <div className="mx-auto grid min-h-[min(92vh,880px)] w-full max-w-[1152px] lg:grid-cols-2">
        <section
          className="animate-fade-in-up flex flex-col justify-between gap-xl px-md py-xl motion-reduce:animate-none sm:px-lg lg:px-xl lg:py-2xl"
          aria-labelledby="contact-heading"
        >
          <div>
            <p className="inline-flex text-[0.72rem] font-bold uppercase tracking-[0.14em] text-warning">
              {t('contact.kicker')}
            </p>
            <h1
              id="contact-heading"
              className={`${displayClassName} mt-md text-4xl text-foreground md:text-5xl lg:text-[3.4rem]`}
            >
              {t('contact.title')}
            </h1>
            <p className="mt-md max-w-xl text-lg text-muted-foreground">
              {t('contact.description')}
            </p>
          </div>

          <div className="relative aspect-[16/11] w-full overflow-hidden rounded-xl border border-border sm:aspect-[5/3] lg:aspect-auto lg:min-h-[14rem] lg:max-h-[22rem] lg:flex-1">
            <Image
              src={homeImages.philosophy}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/55 via-transparent to-transparent" />
            <div className="absolute inset-x-md bottom-md rounded-lg border border-border bg-surface/95 px-md py-sm shadow-md backdrop-blur-sm sm:inset-x-lg">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-warning">
                {t('contact.mediaCaption')}
              </p>
              <p className="mt-xs text-sm text-foreground">{address}</p>
            </div>
          </div>

          <dl className="grid gap-md sm:grid-cols-2">
            <div>
              <dt className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                {t('home.visit.hoursLabel')}
              </dt>
              <dd className="mt-xs text-foreground">{t('home.visit.hours')}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                {t('home.visit.addressLabel')}
              </dt>
              <dd className="mt-xs text-foreground">{address}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                {t('home.visit.phoneLabel')}
              </dt>
              <dd className="mt-xs">
                <a
                  href={`tel:${phone.replace(/\s/g, '')}`}
                  className="text-foreground transition-colors duration-normal hover:text-secondary"
                >
                  {phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                {t('home.visit.emailLabel')}
              </dt>
              <dd className="mt-xs">
                <a
                  href={`mailto:${email}`}
                  className="text-foreground transition-colors duration-normal hover:text-secondary"
                >
                  {email}
                </a>
              </dd>
            </div>
          </dl>
        </section>

        <section
          className="animate-fade-in-up flex items-center px-md py-xl motion-reduce:animate-none sm:px-lg lg:px-xl lg:py-2xl"
          style={{ animationDelay: '120ms' }}
          aria-labelledby="contact-form-heading"
        >
          <div className="w-full rounded-xl border border-border bg-surface/95 p-lg shadow-lg backdrop-blur-sm sm:p-xl">
            <h2
              id="contact-form-heading"
              className={`${displayClassName} text-2xl text-foreground md:text-3xl`}
            >
              {t('contact.formTitle')}
            </h2>
            <p className="mt-sm max-w-md text-muted-foreground">{t('contact.formLede')}</p>
            <div className="mt-lg">
              <ContactForm labels={getContactFormLabels(locale)} />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};
