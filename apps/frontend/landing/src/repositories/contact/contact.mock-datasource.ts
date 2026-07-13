import 'server-only';

import type { ContactDatasource } from './contact.datasource';
import type { ContactFormValues, ContactSubmissionResult } from './contact.types';

const MOCK_DELAY_MS = 800;

export const createMockContactDatasource = (): ContactDatasource => ({
  submitContact: async (values: ContactFormValues): Promise<ContactSubmissionResult> => {
    await new Promise((resolve) => {
      setTimeout(resolve, MOCK_DELAY_MS);
    });

    return {
      success: true,
      message: `Mock submission received from ${values.email}.`,
    };
  },
});
