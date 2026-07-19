export const menuCategories = [
  'breakfast',
  'snacks',
  'appetizers',
  'mainCourse',
  'desserts',
  'drinks',
  'healthy',
  'kids',
  'seasonal',
  'specialDiet',
] as const;

export type MenuCategory = (typeof menuCategories)[number];

export const menuLabels = ['bestSeller', 'chefChoice', 'new', 'limited', 'todaysSpecial'] as const;

export type MenuLabel = (typeof menuLabels)[number];

export type MenuSpicyLevel = 0 | 1 | 2 | 3;

export type MenuItem = {
  id: string;
  code: string;
  name: string;
  /** Longer dish blurb — reserved for product detail; card uses `taste` + ingredients. */
  description: string;
  taste: string;
  category: MenuCategory;
  ingredients: string[];
  price: number;
  currency: 'USD';
  rating: number;
  calories: number;
  protein: number;
  prepMinutes: number;
  spicyLevel: MenuSpicyLevel;
  labels: MenuLabel[];
  imageUrl: string;
};

export type MenuSearchQuery = {
  q: string;
  category: MenuCategory | 'all';
  page: number;
  pageSize: number;
};

export type MenuSearchResult = {
  items: MenuItem[];
  page: number;
  pageSize: number;
  total: number;
  hasMore: boolean;
};

export const isMenuCategory = (value: string): value is MenuCategory =>
  (menuCategories as readonly string[]).includes(value);

export const isMenuLabel = (value: string): value is MenuLabel =>
  (menuLabels as readonly string[]).includes(value);
