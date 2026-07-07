import { getDesignTokenCssVariables } from '@enterprise/design-tokens';
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

export type Theme = 'light' | 'dark' | 'system';

export const PACKAGE_NAME = '@enterprise/theme' as const;

export type ResolvedTheme = 'light' | 'dark';

export type ThemeProviderProps = {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
  attribute?: string;
  enableSystem?: boolean;
};

type ThemeContextValue = {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getSystemTheme(): ResolvedTheme {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function resolveTheme(theme: Theme): ResolvedTheme {
  return theme === 'system' ? getSystemTheme() : theme;
}

function applyTheme(resolved: ResolvedTheme, attribute: string): void {
  if (typeof document === 'undefined') return;
  document.documentElement.setAttribute(attribute, resolved);
  document.documentElement.style.colorScheme = resolved;

  for (const variable of getDesignTokenCssVariables()) {
    document.documentElement.style.setProperty(variable, `var(--${resolved}-${variable.slice(2)})`);
  }
}

/** SSR-safe theme provider — manages CSS variables and prefers-color-scheme. No UI components. */
export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'enterprise-theme',
  attribute = 'data-theme',
  enableSystem = true,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') return defaultTheme;
    const stored = window.localStorage.getItem(storageKey) as Theme | null;
    return stored ?? defaultTheme;
  });

  const resolvedTheme = useMemo(() => {
    if (!enableSystem && theme === 'system') return 'light';
    return resolveTheme(theme);
  }, [enableSystem, theme]);

  const setTheme = useCallback(
    (next: Theme) => {
      setThemeState(next);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(storageKey, next);
      }
    },
    [storageKey],
  );

  useEffect(() => {
    applyTheme(resolvedTheme, attribute);
  }, [attribute, resolvedTheme]);

  useEffect(() => {
    if (!enableSystem || theme !== 'system' || typeof window === 'undefined') {
      return undefined;
    }

    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => {
      applyTheme(resolveTheme('system'), attribute);
    };
    media.addEventListener('change', onChange);
    return () => {
      media.removeEventListener('change', onChange);
    };
  }, [attribute, enableSystem, theme]);

  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme }),
    [resolvedTheme, setTheme, theme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
