import { themeCookieName, type ThemePreference } from '@/config/theme';

export const persistThemePreference = (theme: ThemePreference): void => {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(themeCookieName, theme);
  document.cookie = `${themeCookieName}=${theme};path=/;max-age=31536000;samesite=lax`;
};

export const getNextThemePreference = (current: ThemePreference): ThemePreference =>
  current === 'light' ? 'dark' : 'light';
