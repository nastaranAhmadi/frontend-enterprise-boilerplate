'use client';

import { useMutation } from '@tanstack/react-query';

import { submitContactRequest } from '@/lib/api/submit-contact-client';
import type { ContactFormValues } from '@/repositories/contact/contact.types';

export const useSubmitContact = () =>
  useMutation({
    mutationFn: (values: ContactFormValues) => submitContactRequest(values),
  });
