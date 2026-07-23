export const themeCookieName = 'enterprise-theme';

export type ThemePreference = 'light' | 'dark';

export const defaultThemePreference: ThemePreference = 'light';

export const readStoredThemePreference = (): ThemePreference => {
  if (typeof window === 'undefined') {
    return defaultThemePreference;
  }

  const stored = localStorage.getItem(themeCookieName);

  return stored === 'dark' || stored === 'light' ? stored : defaultThemePreference;
};
