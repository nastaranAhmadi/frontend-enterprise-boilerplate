'use client';

import { Moon, Sun } from 'lucide-react';

import { useThemePreference } from '@/lib/theme/theme-preference-context';

type ThemeLabels = {
  light: string;
  dark: string;
  switchToLight: string;
  switchToDark: string;
};

type ThemeToggleProps = {
  labels: Pick<ThemeLabels, 'switchToLight' | 'switchToDark'>;
  className?: string;
};

type ThemeAppearanceSwitchProps = {
  labels: ThemeLabels;
};

/** Compact icon button — used in the desktop header. */
export const ThemeToggle = ({ labels, className }: ThemeToggleProps) => {
  const { theme, toggleTheme } = useThemePreference();
  const isLight = theme === 'light';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isLight ? labels.switchToDark : labels.switchToLight}
      className={[
        'inline-flex h-9 w-9 items-center justify-center rounded-md text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {isLight ? (
        <Moon aria-hidden="true" className="h-4 w-4" strokeWidth={1.75} />
      ) : (
        <Sun aria-hidden="true" className="h-4 w-4" strokeWidth={1.75} />
      )}
    </button>
  );
};

/** Atmospheric mood tiles — used in the mobile bottom sheet. */
export const ThemeAppearanceSwitch = ({ labels }: ThemeAppearanceSwitchProps) => {
  const { theme, setThemePreference } = useThemePreference();
  const isLight = theme === 'light';

  return (
    <div
      role="group"
      aria-label={`${labels.light} / ${labels.dark}`}
      className="grid w-full grid-cols-2 gap-sm"
    >
      <button
        type="button"
        aria-pressed={isLight}
        aria-label={labels.switchToLight}
        onClick={() => {
          setThemePreference('light');
        }}
        className={[
          'group relative overflow-hidden rounded-xl text-start transition-all duration-300 motion-reduce:transition-none',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
          isLight
            ? 'scale-[1.01] shadow-md ring-2 ring-primary/40'
            : 'opacity-80 ring-1 ring-border hover:opacity-100',
        ].join(' ')}
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(145deg,#f7f6f2_0%,#eef1ea_48%,#d9e4dc_100%)]"
        />
        <span
          aria-hidden="true"
          className="absolute -end-3 -top-4 h-16 w-16 rounded-full bg-[radial-gradient(circle_at_center,#f4e8c8_0%,transparent_70%)] opacity-90 transition-transform duration-500 group-hover:scale-110 motion-reduce:transition-none"
        />
        <span className="relative flex min-h-[4.75rem] flex-col justify-between gap-md p-md">
          <Sun aria-hidden="true" className="h-5 w-5 text-[#3d5248]" strokeWidth={1.75} />
          <span className="text-sm font-medium tracking-wide text-[#1c2420]">{labels.light}</span>
        </span>
      </button>

      <button
        type="button"
        aria-pressed={!isLight}
        aria-label={labels.switchToDark}
        onClick={() => {
          setThemePreference('dark');
        }}
        className={[
          'group relative overflow-hidden rounded-xl text-start transition-all duration-300 motion-reduce:transition-none',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
          !isLight
            ? 'scale-[1.01] shadow-md ring-2 ring-primary/50'
            : 'opacity-80 ring-1 ring-border hover:opacity-100',
        ].join(' ')}
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(145deg,#121816_0%,#1a211e_52%,#2a332f_100%)]"
        />
        <span
          aria-hidden="true"
          className="absolute -end-2 -top-3 h-14 w-14 rounded-full bg-[radial-gradient(circle_at_center,#a3b59f_0%,transparent_68%)] opacity-40 transition-transform duration-500 group-hover:scale-110 motion-reduce:transition-none"
        />
        <span className="relative flex min-h-[4.75rem] flex-col justify-between gap-md p-md">
          <Moon aria-hidden="true" className="h-5 w-5 text-[#a3b59f]" strokeWidth={1.75} />
          <span className="text-sm font-medium tracking-wide text-[#eef1ed]">{labels.dark}</span>
        </span>
      </button>
    </div>
  );
};
