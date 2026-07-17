export type MessageTree = unknown;

export type Translate = {
  (path: string): string;
  number: (path: string) => number;
  strings: (path: string) => string[];
};

const isProduction =
  (globalThis as { process?: { env?: { NODE_ENV?: string } } }).process?.env?.NODE_ENV ===
  'production';

export const readPath = (root: MessageTree, path: string): unknown => {
  const parts = path.split('.').filter(Boolean);

  let current: unknown = root;
  for (const part of parts) {
    if (current === null || typeof current !== 'object' || Array.isArray(current)) {
      return undefined;
    }

    current = (current as Record<string, unknown>)[part];
  }

  return current;
};

const missingKey = (path: string, expected: string): void => {
  if (isProduction) {
    return;
  }

  console.error(`[i18n] Missing ${expected} at "${path}"`);
};

/** Translate a dotted path against a message tree, e.g. `t(dict, 'home.hero.title')`. */
export const t = (dictionary: MessageTree, path: string): string => {
  const value = readPath(dictionary, path);
  if (typeof value === 'string') {
    return value;
  }

  missingKey(path, 'string');
  return path;
};

export const tNumber = (dictionary: MessageTree, path: string): number => {
  const value = readPath(dictionary, path);
  if (typeof value === 'number') {
    return value;
  }

  missingKey(path, 'number');
  return 0;
};

export const tStrings = (dictionary: MessageTree, path: string): string[] => {
  const value = readPath(dictionary, path);
  if (Array.isArray(value) && value.every((item) => typeof item === 'string')) {
    return value;
  }

  missingKey(path, 'string[]');
  return [];
};

/** Bound translator for one locale's message tree — `createT(dict)('home.hero.title')`. */
export const createT = (dictionary: MessageTree): Translate => {
  const translate = ((path: string) => t(dictionary, path)) as Translate;
  translate.number = (path: string) => tNumber(dictionary, path);
  translate.strings = (path: string) => tStrings(dictionary, path);
  return translate;
};

/**
 * App binding: pass your per-locale message trees once, then `createT(locale)`.
 *
 * @example
 * const createT = createTranslator(dictionaries);
 * const t = createT('en');
 * t('home.hero.title');
 */
export const createTranslator = <Locale extends string>(
  dictionaries: Record<Locale, MessageTree>,
): ((locale: Locale) => Translate) => {
  return (locale: Locale) => createT(dictionaries[locale]);
};
