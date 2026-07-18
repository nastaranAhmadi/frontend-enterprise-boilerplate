'use client';

import Image from 'next/image';
import Link from 'next/link';

import { buildLocalizedPath } from '@/config/routes';
import type { Locale } from '@/config/site';
import { galleryImages } from '@/features/landing/data/home-content';
import { useRevealOnScroll } from '@/features/landing/hooks/use-reveal-on-scroll';
import { createT } from '@/i18n/t';

type GallerySectionProps = {
  locale: Locale;
};

export const GallerySection = ({ locale }: GallerySectionProps) => {
  const t = createT(locale);
  const { ref, visible } = useRevealOnScroll();

  return (
    <section id="gallery" className="scroll-mt-24 px-md py-2xl md:py-3xl">
      <div className="mx-auto max-w-6xl">
        <div
          ref={ref}
          className={`mb-xl max-w-2xl transition-all duration-700 motion-reduce:transition-none ${
            visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          <h2 className="text-3xl text-foreground md:text-4xl">{t('home.gallery.title')}</h2>
          <p className="mt-sm text-muted-foreground">{t('home.gallery.subtitle')}</p>
        </div>

        <div className="relative">
          <div
            className={`columns-2 gap-md transition-opacity duration-700 motion-reduce:transition-none md:columns-3 ${
              visible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {galleryImages.map((image) => (
              <div key={image.src} className="mb-md break-inside-avoid">
                <div className={`relative w-full overflow-hidden rounded-lg ${image.height}`}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-[1.02] motion-reduce:transform-none"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                </div>
              </div>
            ))}
          </div>

          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background via-background/90 to-transparent"
            aria-hidden="true"
          />

          <div className="relative z-10 -mt-8 flex flex-col items-center gap-sm pb-md">
            <Link
              href={buildLocalizedPath(locale, 'gallery')}
              className="group flex flex-col items-center gap-xs text-sm font-medium text-foreground transition-colors hover:text-secondary"
            >
              <span>{t('home.gallery.loadMore')}</span>
              <span
                aria-hidden="true"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface-elevated shadow-sm transition-transform group-hover:border-secondary motion-safe:animate-bounce-gentle"
              >
                ↓
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
