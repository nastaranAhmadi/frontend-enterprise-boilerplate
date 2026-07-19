'use client';

import { FormField, TextareaField } from '@enterprise/ui';
import { Button } from '@enterprise/ui/button';
import { type SubmitEvent, useState } from 'react';

import {
  type ContactFormLabels,
  emptyContactFormValues,
  validateContactForm,
} from '@/features/contact/contact-form.types';
import { useSubmitContact } from '@/features/contact/hooks/use-submit-contact';
import type { ContactFormValues } from '@/repositories/contact/contact.types';

type ContactFormProps = {
  labels: ContactFormLabels;
};

export const ContactForm = ({ labels }: ContactFormProps) => {
  const [values, setValues] = useState<ContactFormValues>(emptyContactFormValues);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof ContactFormValues, string>>>(
    {},
  );
  const [submitted, setSubmitted] = useState(false);

  const mutation = useSubmitContact();

  const updateField = (field: keyof ContactFormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setFieldErrors((current) => ({ ...current, [field]: undefined }));
    setSubmitted(false);
  };

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errors = validateContactForm(values, labels.validation);
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    try {
      await mutation.mutateAsync(values);
      setValues(emptyContactFormValues());
      setSubmitted(true);
    } catch {
      setSubmitted(false);
    }
  };

  return (
    <form className="flex flex-col gap-md" onSubmit={handleSubmit} noValidate>
      <FormField
        name="name"
        type="text"
        autoComplete="name"
        label={labels.name}
        placeholder={labels.namePlaceholder}
        value={values.name}
        onChange={(event) => {
          updateField('name', event.target.value);
        }}
        error={fieldErrors.name}
        required
      />

      <FormField
        name="email"
        type="email"
        autoComplete="email"
        label={labels.email}
        placeholder={labels.emailPlaceholder}
        value={values.email}
        onChange={(event) => {
          updateField('email', event.target.value);
        }}
        error={fieldErrors.email}
        required
      />

      <TextareaField
        name="message"
        label={labels.message}
        placeholder={labels.messagePlaceholder}
        value={values.message}
        onChange={(event) => {
          updateField('message', event.target.value);
        }}
        error={fieldErrors.message}
        rows={6}
        required
      />

      <div className="flex flex-col gap-sm pt-xs">
        <Button
          type="submit"
          variant="filled"
          fullWidth
          loading={mutation.isPending}
          disabled={mutation.isPending}
          className="min-h-12"
        >
          {mutation.isPending ? labels.submitting : labels.submit}
        </Button>

        {submitted ? (
          <p className="rounded-md bg-success-muted px-md py-sm text-sm text-success" role="status">
            {labels.success}
          </p>
        ) : null}

        {mutation.isError ? (
          <p className="rounded-md bg-error-muted px-md py-sm text-sm text-error" role="alert">
            {labels.error}
          </p>
        ) : null}
      </div>
    </form>
  );
};
