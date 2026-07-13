import { themeCookieName, type ThemePreference } from '@/config/theme';

export const getThemeCookieName = (): string => themeCookieName;

export const parseThemeCookie = (value: string | undefined): ThemePreference | undefined => {
  if (value === 'light' || value === 'dark') {
    return value;
  }
  return undefined;
};
