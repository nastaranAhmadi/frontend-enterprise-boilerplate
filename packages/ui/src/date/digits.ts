const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'] as const;
const ARABIC_INDIC_DIGITS = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'] as const;

const LATIN_TO_PERSIAN = new Map<string, string>(
  PERSIAN_DIGITS.map((digit, index) => [String(index), digit]),
);

const LOCALIZED_TO_LATIN = new Map<string, string>();

for (let index = 0; index < 10; index += 1) {
  LOCALIZED_TO_LATIN.set(PERSIAN_DIGITS[index] ?? '', String(index));
  LOCALIZED_TO_LATIN.set(ARABIC_INDIC_DIGITS[index] ?? '', String(index));
}

export const usesLocalizedDigits = (locale: string): boolean => {
  const language = locale.toLowerCase().split('-')[0];
  return language === 'fa' || language === 'ar';
};

export const localizeDigits = (value: string, locale: string): string => {
  if (!usesLocalizedDigits(locale)) {
    return value;
  }

  return value.replace(/\d/g, (digit) => LATIN_TO_PERSIAN.get(digit) ?? digit);
};

export const delocalizeDigits = (value: string): string =>
  value.replace(/[۰-۹٠-٩]/g, (digit) => LOCALIZED_TO_LATIN.get(digit) ?? digit);
