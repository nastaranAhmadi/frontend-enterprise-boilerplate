import 'server-only';

import type { ContactFormValues, ContactSubmissionResult } from './contact.types';

export type ContactDatasource = {
  submitContact: (values: ContactFormValues) => Promise<ContactSubmissionResult>;
};
