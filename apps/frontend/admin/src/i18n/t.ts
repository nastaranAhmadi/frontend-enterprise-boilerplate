import { createTranslator } from '@enterprise/i18n';

import { dictionaries } from './dictionaries';

/** App-bound translator — `const t = createT(locale); t('nav.orders')`. */
export const createT = createTranslator(dictionaries);

export type Translator = ReturnType<typeof createT>;
