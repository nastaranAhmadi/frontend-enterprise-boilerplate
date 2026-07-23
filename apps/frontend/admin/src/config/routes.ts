export const routes = {
  dashboard: '/',
  orders: '/orders',
  tables: '/tables',
  kitchen: '/kitchen',
  menus: '/menus',
  analytics: '/analytics',
  settings: '/settings',
} as const;

export type AdminRoutePath = (typeof routes)[keyof typeof routes];
