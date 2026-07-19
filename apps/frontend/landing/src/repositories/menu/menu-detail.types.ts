import type { MenuItem } from '@/repositories/menu/menu.types';

export type MenuDetailReview = {
  id: string;
  author: string;
  rating: number;
  body: string;
};

export type MenuDetail = MenuItem & {
  slug: string;
  story: string;
  origin: string;
  reviews: MenuDetailReview[];
  /** Optional hover/focus assemble video for the hero still. */
  assembleVideoSrc?: string;
};

export const mockMenuDetailSlug = '1';
