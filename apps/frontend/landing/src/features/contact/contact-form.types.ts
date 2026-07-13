import type { ContactFormValues } from '@/repositories/contact/contact.types';

export type ContactFormLabels = {
  name: string;
  namePlaceholder: string;
  email: string;
  emailPlaceholder: string;
  message: string;
  messagePlaceholder: string;
  submit: string;
  submitting: string;
  validation: {
    nameRequired: string;
    emailRequired: string;
    emailInvalid: string;
    messageRequired: string;
  };
  success: string;
  error: string;
};

export type ContactFormField = keyof ContactFormValues;

export type ContactFormErrors = Partial<Record<ContactFormField, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateContactForm = (
  values: ContactFormValues,
  labels: ContactFormLabels['validation'],
): ContactFormErrors => {
  const errors: ContactFormErrors = {};

  if (!values.name.trim()) {
    errors.name = labels.nameRequired;
  }

  if (!values.email.trim()) {
    errors.email = labels.emailRequired;
  } else if (!emailPattern.test(values.email.trim())) {
    errors.email = labels.emailInvalid;
  }

  if (!values.message.trim()) {
    errors.message = labels.messageRequired;
  }

  return errors;
};

export const emptyContactFormValues = (): ContactFormValues => ({
  name: '',
  email: '',
  message: '',
});
