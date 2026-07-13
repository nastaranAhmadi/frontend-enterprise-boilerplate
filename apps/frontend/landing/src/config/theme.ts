export const themeCookieName = 'enterprise-theme';

export type ThemePreference = 'light' | 'dark';

export const themePreferences = ['light', 'dark'] as const;

export const isThemePreference = (value: string): value is ThemePreference =>
  themePreferences.includes(value as ThemePreference);

export const defaultThemePreference: ThemePreference = 'light';
