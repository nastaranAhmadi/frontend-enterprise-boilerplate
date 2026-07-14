import type { CarouselEffect, CarouselProps } from './Carousel.types';

const joinClassNames = (...classes: Array<string | undefined | false>): string =>
  classes.filter(Boolean).join(' ');

const normalizeEffect = (effect: CarouselProps['effect']): CarouselEffect => {
  if (effect === 'fade' || effect === 'cards') return effect;
  return 'slide';
};

export const CAROUSEL_ROOT_CLASS = 'relative w-full font-sans';
export const CAROUSEL_VIEWPORT_CLASS = 'overflow-hidden';
export const CAROUSEL_VIEWPORT_DRAGGABLE_CLASS =
  'cursor-grab touch-none select-none active:cursor-grabbing';
export const CAROUSEL_TRACK_DRAGGING_CLASS = '!transition-none';
export const CAROUSEL_TRACK_BASE_CLASS = 'flex transition-transform duration-normal ease-out';
export const CAROUSEL_TRACK_VERTICAL_CLASS = 'flex-col';
export const CAROUSEL_SLIDE_BASE_CLASS = 'shrink-0 grow-0';
export const CAROUSEL_SLIDE_FADE_CLASS = 'absolute inset-0 transition-opacity duration-normal';
export const CAROUSEL_SLIDE_CARDS_CLASS = 'transition-[transform,opacity] duration-normal';
export const CAROUSEL_NAVIGATION_CLASS =
  'absolute top-1/2 z-10 flex -translate-y-1/2 items-center justify-center';
export const CAROUSEL_NAVIGATION_PREV_CLASS = 'start-2';
export const CAROUSEL_NAVIGATION_NEXT_CLASS = 'end-2';
export const CAROUSEL_NAVIGATION_VERTICAL_PREV_CLASS =
  'start-1/2 top-2 -translate-x-1/2 translate-y-0';
export const CAROUSEL_NAVIGATION_VERTICAL_NEXT_CLASS =
  'start-1/2 bottom-2 top-auto -translate-x-1/2 translate-y-0';
export const CAROUSEL_PAGINATION_CLASS = 'mt-sm flex items-center justify-center gap-2';
export const CAROUSEL_BULLET_BASE_CLASS =
  'h-2 w-2 rounded-full border border-border bg-background transition-colors duration-normal';
export const CAROUSEL_BULLET_ACTIVE_CLASS = 'bg-primary border-primary';
export const CAROUSEL_FRACTION_CLASS = 'text-sm text-muted-foreground';

export const getCarouselRootClassName = ({ className }: { className?: string } = {}): string =>
  joinClassNames(CAROUSEL_ROOT_CLASS, className);

export const getCarouselViewportClassName = ({
  vertical,
  effect,
  draggable,
  className,
}: {
  vertical?: boolean;
  effect?: CarouselProps['effect'];
  draggable?: boolean;
  className?: string;
}): string =>
  joinClassNames(
    CAROUSEL_VIEWPORT_CLASS,
    normalizeEffect(effect) !== 'slide' && 'relative',
    vertical && effect === 'slide' && 'h-48 sm:h-64 md:h-80',
    !vertical && effect === 'slide' && 'w-full',
    draggable && effect === 'slide' && CAROUSEL_VIEWPORT_DRAGGABLE_CLASS,
    className,
  );

export const getCarouselTrackClassName = ({
  vertical,
  effect,
  dragging,
  className,
}: {
  vertical?: boolean;
  effect?: CarouselProps['effect'];
  dragging?: boolean;
  className?: string;
}): string =>
  joinClassNames(
    normalizeEffect(effect) === 'slide' && CAROUSEL_TRACK_BASE_CLASS,
    vertical && normalizeEffect(effect) === 'slide' && CAROUSEL_TRACK_VERTICAL_CLASS,
    dragging && CAROUSEL_TRACK_DRAGGING_CLASS,
    className,
  );

export const getCarouselSlideClassName = ({
  effect,
  className,
}: {
  effect?: CarouselProps['effect'];
  className?: string;
}): string => {
  const normalized = normalizeEffect(effect);

  return joinClassNames(
    CAROUSEL_SLIDE_BASE_CLASS,
    normalized === 'fade' && CAROUSEL_SLIDE_FADE_CLASS,
    normalized === 'cards' && CAROUSEL_SLIDE_CARDS_CLASS,
    className,
  );
};

export const getCarouselBulletClassName = ({
  active,
  className,
}: {
  active?: boolean;
  className?: string;
}): string =>
  joinClassNames(CAROUSEL_BULLET_BASE_CLASS, active && CAROUSEL_BULLET_ACTIVE_CLASS, className);
