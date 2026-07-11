import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useDesignSystem } from './DesignSystemContext';
import { DesignSystemProvider } from './DesignSystemProvider';

const LocaleProbe = () => {
  const { locale, dir, lang } = useDesignSystem();

  return (
    <div data-testid="probe" data-locale={locale} data-dir={dir} data-lang={lang}>
      Probe
    </div>
  );
};

describe('DesignSystemProvider', () => {
  it('derives rtl direction and language from locale', () => {
    render(
      <DesignSystemProvider locale="fa-IR">
        <LocaleProbe />
      </DesignSystemProvider>,
    );

    const provider = screen.getByTestId('probe').parentElement;
    expect(provider).toHaveAttribute('dir', 'rtl');
    expect(provider).toHaveAttribute('lang', 'fa');
    expect(provider).toHaveAttribute('data-locale', 'fa-IR');
  });

  it('allows explicit dir and lang overrides', () => {
    render(
      <DesignSystemProvider locale="en" dir="rtl" lang="en">
        <LocaleProbe />
      </DesignSystemProvider>,
    );

    const provider = screen.getByTestId('probe').parentElement;
    expect(provider).toHaveAttribute('dir', 'rtl');
    expect(provider).toHaveAttribute('lang', 'en');
  });
});
