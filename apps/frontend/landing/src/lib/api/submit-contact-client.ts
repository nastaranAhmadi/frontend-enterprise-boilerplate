import type {
  ContactFormValues,
  ContactSubmissionResult,
} from '@/repositories/contact/contact.types';

export const submitContactRequest = async (
  values: ContactFormValues,
): Promise<ContactSubmissionResult> => {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values),
  });

  if (!response.ok) {
    throw new Error('Contact submission failed.');
  }

  return (await response.json()) as ContactSubmissionResult;
};
