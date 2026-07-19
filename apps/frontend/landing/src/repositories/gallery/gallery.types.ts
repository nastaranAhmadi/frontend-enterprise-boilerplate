export const galleryCategories = ['drinks', 'mains', 'desserts', 'snacks', 'kitchen'] as const;

export type GalleryCategory = (typeof galleryCategories)[number];

export const galleryPeriods = ['any', 'week', 'month', 'year'] as const;

export type GalleryPeriod = (typeof galleryPeriods)[number];

export const gallerySorts = ['newest', 'mostOrdered', 'trending', 'name'] as const;

export type GallerySort = (typeof gallerySorts)[number];

export type GalleryAspect = 'square' | 'portrait' | 'landscape' | 'featured';

export type GalleryItem = {
  id: string;
  code: string;
  name: string;
  category: GalleryCategory;
  capturedAt: string;
  orderCount: number;
  trendScore: number;
  imageUrl: string;
  aspect: GalleryAspect;
};

export type GallerySearchQuery = {
  q: string;
  category: GalleryCategory | 'all';
  period: GalleryPeriod;
  sort: GallerySort;
  page: number;
  pageSize: number;
};

export type GallerySearchResult = {
  items: GalleryItem[];
  page: number;
  pageSize: number;
  total: number;
  hasMore: boolean;
};

export const isGalleryCategory = (value: string): value is GalleryCategory =>
  (galleryCategories as readonly string[]).includes(value);

export const isGalleryPeriod = (value: string): value is GalleryPeriod =>
  (galleryPeriods as readonly string[]).includes(value);

export const isGallerySort = (value: string): value is GallerySort =>
  (gallerySorts as readonly string[]).includes(value);
