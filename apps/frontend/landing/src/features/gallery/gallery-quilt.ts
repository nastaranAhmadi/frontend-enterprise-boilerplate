import type { GalleryAspect } from '@/repositories/gallery/gallery.types';

/** MUI quilted ImageList-style spans — see https://mui.com/material-ui/react-image-list/#quilted-image-list */
export const galleryQuiltSpanClassName: Record<GalleryAspect, string> = {
  square: 'col-span-1 row-span-1',
  landscape: 'col-span-2 row-span-1',
  portrait: 'col-span-1 row-span-2',
  featured: 'col-span-2 row-span-2',
};

export const GALLERY_QUILT_LIST_CLASS_NAME = [
  '!grid min-w-[18rem] grid-cols-2 gap-1',
  'auto-rows-[96px]',
  'sm:grid-cols-3 sm:auto-rows-[110px]',
  'lg:grid-cols-4 lg:auto-rows-[121px]',
].join(' ');
