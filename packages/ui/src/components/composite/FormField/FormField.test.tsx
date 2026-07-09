import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { FormField } from './FormField';

describe('FormField', () => {
  it('renders label, input, and helper text', () => {
    render(
      <FormField
        id="email"
        label="Email"
        helperText="We will never share your email."
        placeholder="you@example.com"
      />,
    );

    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByText('We will never share your email.')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('you@example.com')).toBeInTheDocument();
  });

  it('forwards ref to the native input element', () => {
    const ref = createRef<HTMLInputElement>();
    render(<FormField ref={ref} id="email" label="Email" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('wires label htmlFor to input id', () => {
    render(<FormField id="email" label="Email" />);
    expect(screen.getByLabelText('Email')).toHaveAttribute('id', 'email');
  });

  it('generates ids when id is omitted', () => {
    render(<FormField label="Email" helperText="Helper" error="Error" />);

    const input = screen.getByLabelText('Email');
    const inputId = input.id;
    expect(inputId).toBeTruthy();

    expect(screen.getByText('Helper')).toHaveAttribute('id', `${inputId}-helper`);
    expect(screen.getByRole('alert')).toHaveAttribute('id', `${inputId}-error`);
  });

  it('wires aria-describedby to helper text', () => {
    render(<FormField id="email" label="Email" helperText="We will never share your email." />);

    expect(screen.getByLabelText('Email')).toHaveAttribute('aria-describedby', 'email-helper');
    expect(screen.getByText('We will never share your email.')).toHaveAttribute(
      'id',
      'email-helper',
    );
  });

  it('wires aria-describedby to helper text and error message', () => {
    render(
      <FormField
        id="email"
        label="Email"
        helperText="We will never share your email."
        error="Email is required."
      />,
    );

    expect(screen.getByLabelText('Email')).toHaveAttribute(
      'aria-describedby',
      'email-helper email-error',
    );
    expect(screen.getByRole('alert')).toHaveTextContent('Email is required.');
  });

  it('merges consumer aria-describedby with generated ids', () => {
    render(
      <FormField
        id="email"
        label="Email"
        helperText="Helper"
        aria-describedby="external-description"
      />,
    );

    expect(screen.getByLabelText('Email')).toHaveAttribute(
      'aria-describedby',
      'email-helper external-description',
    );
  });

  it('sets aria-invalid when error is present', () => {
    render(<FormField id="email" label="Email" error="Email is required." />);

    expect(screen.getByLabelText('Email')).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('alert')).toHaveTextContent('Email is required.');
  });

  it('does not set aria-invalid when there is no error', () => {
    render(<FormField id="email" label="Email" helperText="Helper" />);
    expect(screen.getByLabelText('Email')).not.toHaveAttribute('aria-invalid');
  });

  it('renders required indicator on the label', () => {
    render(<FormField id="email" label="Email" required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('disables the input when disabled', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<FormField id="email" label="Email" disabled onChange={onChange} />);
    await user.type(screen.getByLabelText('Email'), 'a');

    expect(screen.getByLabelText('Email')).toBeDisabled();
    expect(onChange).not.toHaveBeenCalled();
  });

  it('applies className to the field root and inputRootClassName to the Input root wrapper', () => {
    const { container } = render(
      <FormField
        id="email"
        label="Email"
        className="custom-field"
        inputRootClassName="custom-input-root"
      />,
    );

    expect(container.firstChild).toHaveClass('custom-field');
    expect(screen.getByLabelText('Email').parentElement?.parentElement).toHaveClass(
      'custom-input-root',
    );
  });

  it('passes through native input attributes', () => {
    render(
      <FormField
        id="email"
        label="Email"
        type="email"
        name="email"
        autoComplete="email"
        placeholder="you@example.com"
      />,
    );

    const input = screen.getByLabelText('Email');
    expect(input).toHaveAttribute('type', 'email');
    expect(input).toHaveAttribute('name', 'email');
    expect(input).toHaveAttribute('autocomplete', 'email');
  });
});
