'use client';

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

const SunIcon = ({ className }: { className?: string }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className={['h-4 w-4 fill-none stroke-current stroke-[1.75]', className]
      .filter(Boolean)
      .join(' ')}
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </svg>
);

const MoonIcon = ({ className }: { className?: string }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className={['h-4 w-4 fill-none stroke-current stroke-[1.75]', className]
      .filter(Boolean)
      .join(' ')}
  >
    <path d="M21 14.5A8.5 8.5 0 1 1 9.5 3 7 7 0 0 0 21 14.5Z" />
  </svg>
);

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
        'inline-flex h-9 w-9 items-center justify-center rounded-md text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {isLight ? <MoonIcon /> : <SunIcon />}
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
          <SunIcon className="h-5 w-5 text-[#3d5248]" />
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
          <MoonIcon className="h-5 w-5 text-[#a3b59f]" />
          <span className="text-sm font-medium tracking-wide text-[#eef1ed]">{labels.dark}</span>
        </span>
      </button>
    </div>
  );
};
