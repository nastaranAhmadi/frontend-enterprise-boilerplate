import 'server-only';

import type {
  ContactFormValues,
  ContactSubmissionResult,
} from '@/repositories/contact/contact.types';
import { createContactRepositoryForApp } from '@/repositories/contact/create-contact-repository';

export const submitContact = (values: ContactFormValues): Promise<ContactSubmissionResult> => {
  const repository = createContactRepositoryForApp();
  return repository.submitContact(values);
};
