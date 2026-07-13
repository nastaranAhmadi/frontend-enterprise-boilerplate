import 'server-only';

import type { ContactDatasource } from './contact.datasource';
import type { ContactFormValues, ContactSubmissionResult } from './contact.types';

export const createContactRepository = (datasource: ContactDatasource) => ({
  submitContact: (values: ContactFormValues): Promise<ContactSubmissionResult> =>
    datasource.submitContact(values),
});

export type ContactRepository = ReturnType<typeof createContactRepository>;
