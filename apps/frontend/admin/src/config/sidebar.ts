export const sidebarStorageKey = 'enterprise-admin-sidebar-collapsed';

export const readStoredSidebarCollapsed = (): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }

  return localStorage.getItem(sidebarStorageKey) === 'true';
};
