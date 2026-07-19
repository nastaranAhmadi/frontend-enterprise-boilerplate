import type { MenuCategory, MenuItem } from '@/repositories/menu/menu.types';

/** Client-side category filter for Phase 1 browse (search stays in the AI shell). */
export const filterMenuItemsByCategory = (
  items: MenuItem[],
  category: MenuCategory | 'all',
): MenuItem[] => (category === 'all' ? items : items.filter((item) => item.category === category));
