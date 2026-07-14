import type { Locale } from '@/config/site';
import { getDictionary } from '@/i18n/get-dictionary';

type Dictionary = ReturnType<typeof getDictionary>;
type FeatureKey = keyof Dictionary['home']['features']['items'];

const featureKeys: FeatureKey[] = ['architecture', 'i18n', 'performance'];

type FeaturesSectionProps = {
  locale: Locale;
};

export const FeaturesSection = ({ locale }: FeaturesSectionProps) => {
  const dictionary = getDictionary(locale);
  const { title, subtitle, items } = dictionary.home.features;

  return (
    <section aria-labelledby="features-heading" className="border-y border-border bg-muted/30">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-lg px-md py-xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="features-heading" className="text-2xl font-medium tracking-tight md:text-3xl">
            {title}
          </h2>
          <p className="mt-sm text-muted-foreground">{subtitle}</p>
        </div>

        <ul className="grid gap-md md:grid-cols-3">
          {featureKeys.map((key) => {
            const feature = items[key];

            return (
              <li key={key}>
                <article className="flex h-full flex-col gap-sm rounded-lg border border-border bg-background p-lg">
                  <h3 className="text-lg font-medium text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
