import type { HTMLAttributes, ReactNode } from 'react';

export type CarouselEffect = 'slide' | 'fade' | 'cards';
export type CarouselPaginationType = 'bullets' | 'fraction';

export interface CarouselOwnProps {
  children?: ReactNode;
  className?: string;
  slideClassName?: string;
  navigation?: boolean;
  pagination?: boolean | CarouselPaginationType;
  vertical?: boolean;
  rtl?: boolean;
  effect?: CarouselEffect;
  loop?: boolean;
  slidesPerView?: number;
  spaceBetween?: number;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  draggable?: boolean;
  index?: number;
  defaultIndex?: number;
  onIndexChange?: (index: number) => void;
  'aria-label'?: string;
}

export type CarouselProps = CarouselOwnProps &
  Omit<HTMLAttributes<HTMLDivElement>, keyof CarouselOwnProps>;

export interface CarouselSlideOwnProps {
  children?: ReactNode;
  className?: string;
}

export type CarouselSlideProps = CarouselSlideOwnProps &
  Omit<HTMLAttributes<HTMLDivElement>, keyof CarouselSlideOwnProps>;
