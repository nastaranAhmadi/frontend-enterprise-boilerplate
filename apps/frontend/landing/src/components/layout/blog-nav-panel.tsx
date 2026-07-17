'use client';

import Link from 'next/link';

import { buildLocalizedPath } from '@/config/routes';
import type { Locale } from '@/config/site';
import { createT } from '@/i18n/t';

type BlogNavPanelProps = {
  locale: Locale;
  onNavigate?: () => void;
};

const topicKeys = [
  'shareTaste',
  'shareOrders',
  'donation',
  'newOnMenu',
  'events',
  'heritage',
] as const;

const topicAccents: Record<(typeof topicKeys)[number], string> = {
  shareTaste: 'bg-primary/10 text-primary',
  shareOrders: 'bg-secondary/15 text-secondary',
  donation: 'bg-success-muted text-success',
  newOnMenu: 'bg-accent text-accent-foreground',
  events: 'bg-info-muted text-info',
  heritage: 'bg-warning-muted text-warning',
};

export const BlogNavPanel = ({ locale, onNavigate }: BlogNavPanelProps) => {
  const t = createT(locale);

  return (
    <div className="w-full p-md">
      <ul className="flex flex-col gap-xs">
        {topicKeys.map((key) => (
          <li key={key}>
            <Link
              href={`${buildLocalizedPath(locale, 'blog')}#${key}`}
              onClick={onNavigate}
              className="group flex gap-sm rounded-md p-sm transition-colors hover:bg-muted"
            >
              <span
                aria-hidden="true"
                className={`mt-0.5 h-8 w-1 shrink-0 rounded-full ${topicAccents[key]}`}
              />
              <span className="min-w-0">
                <span className="block text-sm font-medium text-foreground group-hover:text-primary">
                  {t(`header.blog.${key}.title`)}
                </span>
                <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">
                  {t(`header.blog.${key}.description`)}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
