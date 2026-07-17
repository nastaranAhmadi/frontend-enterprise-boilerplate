import { afterEach, describe, expect, it, vi } from 'vitest';

import { createT, createTranslator, t, tNumber, tStrings } from './create-t';

const dictionaries = {
  en: {
    errors: {
      title: 'Something went wrong',
      goHome: 'Go home',
      retry: 'Retry',
    },
    routeTransition: {
      message: 'Hang in there sailor',
    },
    home: {
      experiences: {
        items: {
          elena: { rating: 5 },
        },
      },
      seasonal: {
        items: {
          akami: {
            ingredients: ['Bluefin tuna', 'Shari rice', 'Wasabi'],
          },
        },
      },
    },
  },
  fa: {
    errors: {
      title: 'مشکلی پیش آمد',
      goHome: 'بازگشت به خانه',
      retry: 'تلاش مجدد',
    },
    routeTransition: {
      message: 'صبور باش، داریم می‌ریم',
    },
  },
} as const;

describe('t', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns a string for a dotted path', () => {
    expect(t(dictionaries.en, 'routeTransition.message')).toBe('Hang in there sailor');
    expect(t(dictionaries.fa, 'routeTransition.message')).toBe('صبور باش، داریم می‌ریم');
  });

  it('returns the path and logs when the key is missing', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => undefined);

    expect(t(dictionaries.en, 'missing.key')).toBe('missing.key');
    expect(error).toHaveBeenCalledWith('[i18n] Missing string at "missing.key"');
  });
});

describe('createT', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('binds a dictionary and returns strings', () => {
    const translate = createT(dictionaries.en);

    expect(translate('errors.title')).toBe('Something went wrong');
    expect(translate('errors.goHome')).toBe('Go home');
    expect(translate('routeTransition.message')).toBe('Hang in there sailor');
  });

  it('reads numbers and string arrays via helpers', () => {
    const translate = createT(dictionaries.en);

    expect(translate.number('home.experiences.items.elena.rating')).toBe(5);
    expect(translate.strings('home.seasonal.items.akami.ingredients')).toEqual([
      'Bluefin tuna',
      'Shari rice',
      'Wasabi',
    ]);
  });
});

describe('createTranslator', () => {
  it('binds locale dictionaries for app use', () => {
    const createAppT = createTranslator(dictionaries);

    expect(createAppT('en')('errors.retry')).toBe('Retry');
    expect(createAppT('fa')('errors.retry')).toBe('تلاش مجدد');
  });
});

describe('tNumber / tStrings', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('falls back safely for wrong types', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => undefined);

    expect(tNumber(dictionaries.en, 'errors.title')).toBe(0);
    expect(tStrings(dictionaries.en, 'errors.title')).toEqual([]);
    expect(error).toHaveBeenCalled();
  });
});
