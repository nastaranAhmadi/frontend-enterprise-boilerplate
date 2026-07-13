import 'server-only';

import { createApiClient } from '@enterprise/api-client';

import { env } from '@/config/env';

import type { ContactDatasource } from './contact.datasource';
import type { ContactFormValues, ContactSubmissionResult } from './contact.types';

const apiClient = createApiClient({
  baseUrl: env.siteUrl,
});

export const createApiContactDatasource = (): ContactDatasource => ({
  submitContact: async (values: ContactFormValues): Promise<ContactSubmissionResult> =>
    apiClient.request<ContactSubmissionResult>({
      path: '/api/contact',
      method: 'POST',
      body: values,
    }),
});
