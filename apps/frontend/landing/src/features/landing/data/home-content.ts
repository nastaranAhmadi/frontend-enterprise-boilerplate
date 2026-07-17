export const homeImages = {
  hero: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1200&q=80',
  philosophy:
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80',
} as const;

export type SeasonalItemKey = 'akami' | 'hamachi' | 'uni' | 'otoro' | 'ebi' | 'hotate';

export const seasonalItemKeys: SeasonalItemKey[] = [
  'akami',
  'hamachi',
  'uni',
  'otoro',
  'ebi',
  'hotate',
];

export const seasonalImages: Record<SeasonalItemKey, string> = {
  akami:
    'https://images.unsplash.com/photo-1617196034183-421ce06793d5?auto=format&fit=crop&w=600&q=80',
  hamachi:
    'https://images.unsplash.com/photo-1563612112865-04197d128b17?auto=format&fit=crop&w=600&q=80',
  uni: 'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=600&q=80',
  otoro:
    'https://images.unsplash.com/photo-1611140189652-11444b7886dd?auto=format&fit=crop&w=600&q=80',
  ebi: 'https://images.unsplash.com/photo-1582450871972-ab5ca641643d?auto=format&fit=crop&w=600&q=80',
  hotate:
    'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=600&q=80',
};

export type ExperienceKey = 'elena' | 'marcus' | 'yuki';

export const experienceKeys: ExperienceKey[] = ['elena', 'marcus', 'yuki'];

export const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=500&q=80',
    height: 'h-56',
    alt: 'Chef preparing nigiri',
  },
  {
    src: 'https://images.unsplash.com/photo-1611140189652-11444b7886dd?auto=format&fit=crop&w=500&q=80',
    height: 'h-72',
    alt: 'Tuna sashimi close-up',
  },
  {
    src: 'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=500&q=80',
    height: 'h-48',
    alt: 'Sushi platter overhead',
  },
  {
    src: 'https://images.unsplash.com/photo-1582450871972-ab5ca641643d?auto=format&fit=crop&w=500&q=80',
    height: 'h-64',
    alt: 'Shrimp nigiri detail',
  },
  {
    src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=500&q=80',
    height: 'h-80',
    alt: 'Dining room atmosphere',
  },
  {
    src: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=500&q=80',
    height: 'h-52',
    alt: 'Scallop nigiri',
  },
  {
    src: 'https://images.unsplash.com/photo-1563612112865-04197d128b17?auto=format&fit=crop&w=500&q=80',
    height: 'h-60',
    alt: 'Yellowtail sashimi',
  },
  {
    src: 'https://images.unsplash.com/photo-1617196034183-421ce06793d5?auto=format&fit=crop&w=500&q=80',
    height: 'h-44',
    alt: 'Salmon nigiri pair',
  },
] as const;
