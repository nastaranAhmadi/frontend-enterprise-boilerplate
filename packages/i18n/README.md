# @enterprise/i18n

Shared translation lookup and optional React locale provider.

**No translations bundled.** Each app owns its message trees (JSON / TS) and binds them once.

## Primary API (RSC + client)

Import from the root entry — no React, safe in Server Components:

```ts
import { createTranslator } from '@enterprise/i18n';
import { dictionaries } from './dictionaries';

export const createT = createTranslator(dictionaries);

const t = createT('en');
t('home.hero.title');
t.number('home.experiences.items.elena.rating');
t.strings('home.seasonal.items.akami.ingredients');
```

Also available: `createT(dictionary)`, `t(dictionary, path)`, `tNumber`, `tStrings`, `readPath`.

## React provider (client only)

```ts
import { I18nProvider, useI18n, useTranslation } from '@enterprise/i18n/react';
```
