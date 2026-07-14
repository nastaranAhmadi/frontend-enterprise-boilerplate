import { type ReactNode, useEffect, useMemo, useState } from 'react';

import {
  type DesignSystemLocale,
  resolveDirFromLocale,
  resolveLangFromLocale,
  type TextDirection,
} from '../locale/locale';
import { DesignSystemContextProvider, type DesignSystemTheme } from './DesignSystemContext';

export type { DesignSystemTheme } from './DesignSystemContext';

export type DesignSystemProviderProps = {
  children?: ReactNode;
  /** Controlled theme applied to the provider root. */
  theme?: DesignSystemTheme;
  /** Initial theme when uncontrolled. Defaults to `light`. */
  defaultTheme?: DesignSystemTheme;
  /** BCP 47 locale tag. Used to derive `dir` and `lang` when those are omitted. */
  locale?: DesignSystemLocale;
  /** Explicit layout direction. Falls back to locale-derived direction. */
  dir?: TextDirection;
  /** Document language for the provider subtree. Falls back to the locale language subtag. */
  lang?: string;
};

export const DesignSystemProvider = function DesignSystemProvider(
  props: DesignSystemProviderProps,
) {
  const { children, theme, defaultTheme = 'light', locale = 'en', dir, lang } = props;
  const [internalTheme, setInternalTheme] = useState<DesignSystemTheme>(defaultTheme);
  const resolvedTheme = theme ?? internalTheme;
  const resolvedDir = dir ?? resolveDirFromLocale(locale);
  const resolvedLang = lang ?? resolveLangFromLocale(locale);

  useEffect(() => {
    if (theme !== undefined) {
      setInternalTheme(theme);
    }
  }, [theme]);

  const contextValue = useMemo(
    () => ({
      theme: resolvedTheme,
      locale,
      dir: resolvedDir,
      lang: resolvedLang,
    }),
    [locale, resolvedDir, resolvedLang, resolvedTheme],
  );

  return (
    <DesignSystemContextProvider value={contextValue}>
      <div
        data-ui-provider=""
        data-theme={resolvedTheme}
        data-locale={locale}
        dir={resolvedDir}
        lang={resolvedLang}
      >
        {children}
      </div>
    </DesignSystemContextProvider>
  );
};

DesignSystemProvider.displayName = 'DesignSystemProvider';
