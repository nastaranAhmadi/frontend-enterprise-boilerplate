'use client';

import { Button } from '@enterprise/ui/button';

import { useThemePreference } from '@/lib/theme/theme-preference-context';

type ThemeToggleProps = {
  labels: {
    light: string;
    dark: string;
    switchToLight: string;
    switchToDark: string;
  };
};

export const ThemeToggle = ({ labels }: ThemeToggleProps) => {
  const { theme, toggleTheme } = useThemePreference();

  return (
    <Button
      type="button"
      variant="ghost"
      size="small"
      onClick={toggleTheme}
      aria-label={theme === 'light' ? labels.switchToDark : labels.switchToLight}
    >
      {labels[theme]}
    </Button>
  );
};
