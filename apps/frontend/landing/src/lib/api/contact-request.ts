import type {
  ContactFormValues,
  ContactSubmissionResult,
} from '@/repositories/contact/contact.types';

const parseContactPayload = (body: unknown): ContactFormValues | null => {
  if (typeof body !== 'object' || body === null) {
    return null;
  }

  const { name, email, message } = body as Partial<ContactFormValues>;

  if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
    return null;
  }

  return { name, email, message };
};

export const parseContactRequest = async (request: Request): Promise<ContactFormValues | null> => {
  try {
    const body: unknown = await request.json();
    return parseContactPayload(body);
  } catch {
    return null;
  }
};

export const toContactErrorResponse = (message: string, status = 400): Response =>
  Response.json({ success: false, message } satisfies ContactSubmissionResult, { status });
