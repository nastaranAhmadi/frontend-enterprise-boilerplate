/** Design token primitives — consumed by theme and UI packages via CSS variables. */
export const PACKAGE_NAME = '@enterprise/design-tokens' as const;

export const designTokens = {
  colors: {
    background: 'var(--color-background)',
    foreground: 'var(--color-foreground)',
    primary: 'var(--color-primary)',
    muted: 'var(--color-muted)',
    border: 'var(--color-border)',
  },
  spacing: {
    xs: 'var(--spacing-xs)',
    sm: 'var(--spacing-sm)',
    md: 'var(--spacing-md)',
    lg: 'var(--spacing-lg)',
    xl: 'var(--spacing-xl)',
  },
  typography: {
    fontFamily: 'var(--font-family-sans)',
    fontSizeSm: 'var(--font-size-sm)',
    fontSizeMd: 'var(--font-size-md)',
    fontSizeLg: 'var(--font-size-lg)',
    lineHeight: 'var(--line-height-base)',
  },
  radius: {
    sm: 'var(--radius-sm)',
    md: 'var(--radius-md)',
    lg: 'var(--radius-lg)',
    full: 'var(--radius-full)',
  },
  shadows: {
    sm: 'var(--shadow-sm)',
    md: 'var(--shadow-md)',
    lg: 'var(--shadow-lg)',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  zIndex: {
    base: 'var(--z-base)',
    dropdown: 'var(--z-dropdown)',
    modal: 'var(--z-modal)',
    toast: 'var(--z-toast)',
  },
  animation: {
    durationFast: 'var(--duration-fast)',
    durationNormal: 'var(--duration-normal)',
    durationSlow: 'var(--duration-slow)',
    easingDefault: 'var(--easing-default)',
    easingIn: 'var(--easing-in)',
    easingOut: 'var(--easing-out)',
  },
} as const;

export type DesignTokens = typeof designTokens;

/** CSS variable names for runtime theme injection. */
export const cssVariableNames = {
  color: [
    '--color-background',
    '--color-foreground',
    '--color-primary',
    '--color-muted',
    '--color-border',
  ],
  spacing: ['--spacing-xs', '--spacing-sm', '--spacing-md', '--spacing-lg', '--spacing-xl'],
} as const;

export function getDesignTokenCssVariables(): string[] {
  return [...cssVariableNames.color, ...cssVariableNames.spacing];
}
