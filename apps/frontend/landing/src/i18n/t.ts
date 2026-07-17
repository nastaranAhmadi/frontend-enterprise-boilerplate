import { createTranslator } from '@enterprise/i18n';

import { dictionaries } from './dictionaries';

/** App-bound translator — `const t = createT(locale); t('home.hero.title')`. */
export const createT = createTranslator(dictionaries);
