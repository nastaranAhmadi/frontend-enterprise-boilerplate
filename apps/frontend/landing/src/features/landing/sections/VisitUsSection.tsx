import type { Locale } from '@/config/site';
import { createT } from '@/i18n/t';

type VisitUsSectionProps = {
  locale: Locale;
};

export const VisitUsSection = ({ locale }: VisitUsSectionProps) => {
  const t = createT(locale);
  const phone = t('home.visit.phone');
  const email = t('home.visit.email');
  const address = t('home.visit.address');

  return (
    <section
      id="visit"
      className="scroll-mt-24 border-t border-border bg-surface px-md py-2xl md:py-3xl"
    >
      <div className="mx-auto grid max-w-6xl gap-xl lg:grid-cols-2">
        <div>
          <h2 className="font-serif text-3xl text-foreground md:text-4xl">
            {t('home.visit.title')}
          </h2>
          <dl className="mt-lg space-y-md text-foreground">
            <div>
              <dt className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                {t('home.visit.addressLabel')}
              </dt>
              <dd className="mt-xs">{address}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                {t('home.visit.hoursLabel')}
              </dt>
              <dd className="mt-xs">{t('home.visit.hours')}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                {t('home.visit.phoneLabel')}
              </dt>
              <dd className="mt-xs">
                <a href={`tel:${phone.replace(/\s/g, '')}`} className="hover:text-secondary">
                  {phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                {t('home.visit.emailLabel')}
              </dt>
              <dd className="mt-xs">
                <a href={`mailto:${email}`} className="hover:text-secondary">
                  {email}
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <div className="relative min-h-[16rem] overflow-hidden rounded-lg border border-border bg-muted">
          <div className="absolute inset-0 flex items-center justify-center bg-[linear-gradient(135deg,var(--color-muted)_0%,var(--color-surface)_100%)]">
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary bg-primary/10">
                <span className="h-2.5 w-2.5 rounded-full bg-primary" aria-hidden="true" />
              </div>
              <p className="mt-sm px-md text-sm text-muted-foreground">{address}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
