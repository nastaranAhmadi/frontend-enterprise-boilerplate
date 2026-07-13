import { submitContact } from '@/application/contact/submit-contact';
import { parseContactRequest, toContactErrorResponse } from '@/lib/api/contact-request';

export const POST = async (request: Request): Promise<Response> => {
  const values = await parseContactRequest(request);

  if (!values) {
    return toContactErrorResponse('Invalid contact payload.');
  }

  const result = await submitContact(values);
  return Response.json(result);
};
