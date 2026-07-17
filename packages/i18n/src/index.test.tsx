import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { I18nProvider, useI18n, useTranslation } from './react';

const config = {
  defaultLocale: 'en',
  locales: ['en', 'fa'] as const,
  namespaces: ['common'] as const,
  translations: {
    en: {
      common: {
        greeting: 'Hello',
      },
    },
    fa: {
      common: {
        greeting: 'سلام',
      },
    },
  },
};

const Greeting = () => {
  const { t } = useTranslation('common');
  return <p>{t('greeting')}</p>;
};

const LocaleSwitcher = () => {
  const { locale, setLocale } = useI18n();

  return (
    <button
      type="button"
      onClick={() => {
        setLocale('fa');
      }}
    >
      Switch ({locale})
    </button>
  );
};

describe('I18nProvider', () => {
  it('renders translated copy for the active locale', () => {
    render(
      <I18nProvider config={config}>
        <Greeting />
      </I18nProvider>,
    );

    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('updates locale through setLocale', async () => {
    const user = userEvent.setup();

    render(
      <I18nProvider config={config}>
        <LocaleSwitcher />
        <Greeting />
      </I18nProvider>,
    );

    await user.click(screen.getByRole('button', { name: 'Switch (en)' }));
    expect(screen.getByText('سلام')).toBeInTheDocument();
  });

  it('falls back to the key when a translation is missing', () => {
    const Missing = () => {
      const { t } = useTranslation('common');
      return <p>{t('missing-key')}</p>;
    };

    render(
      <I18nProvider config={config}>
        <Missing />
      </I18nProvider>,
    );

    expect(screen.getByText('missing-key')).toBeInTheDocument();
  });

  it('throws when useI18n is used outside the provider', () => {
    const Broken = () => {
      useI18n();
      return null;
    };

    expect(() => render(<Broken />)).toThrow('useI18n must be used within I18nProvider.');
  });
});
