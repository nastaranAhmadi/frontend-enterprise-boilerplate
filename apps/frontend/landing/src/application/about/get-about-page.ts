import 'server-only';

import { cache } from 'react';

import type { Locale } from '@/config/site';
import type { AboutPageResponse } from '@/repositories/about/about.types';
import { createAboutRepositoryForApp } from '@/repositories/about/create-about-repository';

export const getAboutPage = cache(async (locale: Locale): Promise<AboutPageResponse> => {
  const repository = createAboutRepositoryForApp();
  return await repository.getPage(locale);
});
