import { describe, expect, it } from 'vitest';

import { emptyContactFormValues, validateContactForm } from './contact-form.types';

const validationLabels = {
  nameRequired: 'Name is required',
  emailRequired: 'Email is required',
  emailInvalid: 'Email is invalid',
  messageRequired: 'Message is required',
};

describe('validateContactForm', () => {
  it('returns no errors for valid input', () => {
    expect(
      validateContactForm(
        { name: 'Ada', email: 'ada@example.com', message: 'Hello' },
        validationLabels,
      ),
    ).toEqual({});
  });

  it('requires name, email, and message', () => {
    expect(validateContactForm(emptyContactFormValues(), validationLabels)).toEqual({
      name: validationLabels.nameRequired,
      email: validationLabels.emailRequired,
      message: validationLabels.messageRequired,
    });
  });

  it('rejects invalid email addresses', () => {
    expect(
      validateContactForm(
        { name: 'Ada', email: 'not-an-email', message: 'Hello' },
        validationLabels,
      ),
    ).toEqual({
      email: validationLabels.emailInvalid,
    });
  });
});
