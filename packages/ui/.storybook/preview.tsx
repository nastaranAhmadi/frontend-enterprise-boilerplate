import '../src/styles/tailwind.css';

import type { Preview } from '@storybook/react-vite';
import { type ComponentType, useEffect } from 'react';

import {
  resolveDirFromLocale,
  resolveLangFromLocale,
  type TextDirection,
} from '../src/locale/locale';
import { DesignSystemProvider } from '../src/providers/DesignSystemProvider';

type StorybookDirection = 'auto' | TextDirection;

type StorybookGlobals = {
  theme?: string;
  locale?: string;
  direction?: string;
};

const resolveStorybookDirection = (direction: StorybookDirection, locale: string): TextDirection =>
  direction === 'auto' ? resolveDirFromLocale(locale) : direction;

const StorybookShell = ({
  Story,
  globals,
}: {
  Story: ComponentType;
  globals: StorybookGlobals;
}) => {
  const theme = globals.theme === 'dark' ? 'dark' : 'light';
  const locale = typeof globals.locale === 'string' ? globals.locale : 'en';
  const directionSetting: StorybookDirection =
    globals.direction === 'ltr' || globals.direction === 'rtl' ? globals.direction : 'auto';
  const dir = resolveStorybookDirection(directionSetting, locale);
  const lang = resolveLangFromLocale(locale);

  useEffect(() => {
    document.documentElement.setAttribute('data-app', 'ui');
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', lang);
  }, [dir, lang, theme]);

  return (
    <DesignSystemProvider theme={theme} locale={locale} dir={dir} lang={lang}>
      <div className="min-w-[280px] bg-background p-md font-sans text-foreground">
        <Story />
      </div>
    </DesignSystemProvider>
  );
};

const preview: Preview = {
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
    a11y: {
      test: 'todo',
    },
    options: {
      storySort: {
        order: ['Introduction', 'Base', 'Composite', 'Templates'],
      },
    },
  },
  globalTypes: {
    theme: {
      description: 'Color theme for design tokens',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
    locale: {
      description: 'Locale used to derive language and default direction',
      toolbar: {
        title: 'Locale',
        icon: 'globe',
        items: [
          { value: 'en', title: 'English (en)' },
          { value: 'fa-IR', title: 'Persian (fa-IR)' },
          { value: 'ar', title: 'Arabic (ar)' },
        ],
        dynamicTitle: true,
      },
    },
    direction: {
      description: 'Layout direction for stories',
      toolbar: {
        title: 'Direction',
        icon: 'transfer',
        items: [
          { value: 'auto', title: 'Auto (from locale)' },
          { value: 'ltr', title: 'LTR' },
          { value: 'rtl', title: 'RTL' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'light',
    locale: 'en',
    direction: 'auto',
  },
  decorators: [(Story, { globals }) => <StorybookShell Story={Story} globals={globals} />],
};

export default preview;
