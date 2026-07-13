import { themeCookieName, type ThemePreference } from '@/config/theme';

export const themeInitScript = `(function(){try{var key=${JSON.stringify(themeCookieName)};var match=document.cookie.match(new RegExp('(?:^|; )'+key+'=([^;]*)'));var cookieTheme=match?decodeURIComponent(match[1]):null;var stored=localStorage.getItem(key);var theme=cookieTheme==='dark'||cookieTheme==='light'?cookieTheme:stored==='dark'||stored==='light'?stored:'light';document.documentElement.setAttribute('data-theme',theme);document.cookie=key+'='+theme+';path=/;max-age=31536000;samesite=lax';localStorage.setItem(key,theme);}catch(e){}})();`;

export const resolveThemePreference = (
  cookieValue: string | undefined,
  fallback: ThemePreference = 'light',
): ThemePreference => {
  if (cookieValue === 'light' || cookieValue === 'dark') {
    return cookieValue;
  }
  return fallback;
};
