'use client';

import { Button } from '@enterprise/ui/button';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import type { Locale } from '@/config/site';
import { galleryQuiltSpanClassName } from '@/features/gallery/gallery-quilt';
import type { GalleryItem } from '@/repositories/gallery/gallery.types';

type GalleryTileLabels = {
  follow: string;
  following: string;
  orders: string;
  categories: Record<GalleryItem['category'], string>;
};

type GalleryTileProps = {
  item: GalleryItem;
  locale: Locale;
  labels: GalleryTileLabels;
  followed: boolean;
  onFollowToggle: (id: string) => void;
};

/** Quilted tile — spans cols/rows like MUI ImageList variant="quilted". */
export const GalleryTile = ({
  item,
  locale,
  labels,
  followed,
  onFollowToggle,
}: GalleryTileProps) => {
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [coarsePointer, setCoarsePointer] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(hover: none), (pointer: coarse)');
    const sync = () => {
      setCoarsePointer(media.matches);
    };
    sync();
    media.addEventListener('change', sync);
    return () => {
      media.removeEventListener('change', sync);
    };
  }, []);

  const dateLabel = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(item.capturedAt));

  const showOverlay = coarsePointer ? overlayOpen : undefined;

  return (
    <article
      className={[
        'group relative h-full min-h-0 w-full min-w-0 overflow-hidden bg-muted',
        galleryQuiltSpanClassName[item.aspect],
      ].join(' ')}
    >
      <Image
        src={item.imageUrl}
        alt={item.name}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transform-none"
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
      />

      {coarsePointer ? (
        <button
          type="button"
          className="absolute inset-0 z-[5]"
          aria-expanded={overlayOpen}
          aria-label={item.name}
          onClick={() => {
            setOverlayOpen((open) => !open);
          }}
        />
      ) : null}

      <div
        className={[
          'absolute inset-x-0 bottom-0 z-10 flex flex-col gap-xs border-t border-white/10 bg-black/55 px-sm py-sm text-white shadow-[0_-12px_40px_rgba(0,0,0,0.25)] backdrop-blur-md transition-opacity duration-normal supports-[backdrop-filter]:bg-neutral-900/45',
          coarsePointer
            ? showOverlay
              ? 'opacity-100'
              : 'pointer-events-none opacity-0'
            : 'pointer-events-none opacity-0 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100',
        ].join(' ')}
      >
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.12em] text-white/80">
          {item.code} · {labels.categories[item.category]}
        </p>
        <h3 className="text-sm font-medium leading-snug md:text-base">{item.name}</h3>
        <div className="flex flex-wrap items-center justify-between gap-xs text-xs text-white/85">
          <span>
            {dateLabel} · {labels.orders.replace('{count}', String(item.orderCount))}
          </span>
          <Button
            type="button"
            size="small"
            variant={followed ? 'outlined' : 'filled'}
            className="h-8 min-w-[5.5rem] rounded-md border-white/40 px-sm text-xs"
            onClick={() => {
              onFollowToggle(item.id);
            }}
          >
            {followed ? labels.following : labels.follow}
          </Button>
        </div>
      </div>
    </article>
  );
};
