import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { CheckboxField } from './CheckboxField';

describe('CheckboxField', () => {
  it('renders label, checkbox, and helper text', () => {
    render(
      <CheckboxField id="terms" label="Accept terms" helperText="You must accept to continue." />,
    );

    expect(screen.getByLabelText('Accept terms')).toBeInTheDocument();
    expect(screen.getByText('You must accept to continue.')).toBeInTheDocument();
  });

  it('forwards ref to the native checkbox element', () => {
    const ref = createRef<HTMLInputElement>();
    render(<CheckboxField ref={ref} id="terms" label="Accept terms" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current).toHaveAttribute('type', 'checkbox');
  });

  it('wires label htmlFor to checkbox id', () => {
    render(<CheckboxField id="terms" label="Accept terms" />);
    expect(screen.getByLabelText('Accept terms')).toHaveAttribute('id', 'terms');
  });

  it('generates ids when id is omitted', () => {
    render(<CheckboxField label="Accept terms" helperText="Helper" error="Error" />);

    const checkbox = screen.getByLabelText('Accept terms');
    const checkboxId = checkbox.id;
    expect(checkboxId).toBeTruthy();

    expect(screen.getByText('Helper')).toHaveAttribute('id', `${checkboxId}-helper`);
    expect(screen.getByRole('alert')).toHaveAttribute('id', `${checkboxId}-error`);
  });

  it('wires aria-describedby to helper text', () => {
    render(
      <CheckboxField id="terms" label="Accept terms" helperText="You must accept to continue." />,
    );

    expect(screen.getByLabelText('Accept terms')).toHaveAttribute(
      'aria-describedby',
      'terms-helper',
    );
    expect(screen.getByText('You must accept to continue.')).toHaveAttribute('id', 'terms-helper');
  });

  it('wires aria-describedby to helper text and error message', () => {
    render(
      <CheckboxField
        id="terms"
        label="Accept terms"
        helperText="You must accept to continue."
        error="Terms are required."
      />,
    );

    expect(screen.getByLabelText('Accept terms')).toHaveAttribute(
      'aria-describedby',
      'terms-helper terms-error',
    );
    expect(screen.getByRole('alert')).toHaveTextContent('Terms are required.');
  });

  it('sets aria-invalid when error is present', () => {
    render(<CheckboxField id="terms" label="Accept terms" error="Terms are required." />);

    expect(screen.getByLabelText('Accept terms')).toHaveAttribute('aria-invalid', 'true');
  });

  it('renders required indicator on the label', () => {
    render(<CheckboxField id="terms" label="Accept terms" required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('disables the checkbox when disabled', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<CheckboxField id="terms" label="Accept terms" disabled onChange={onChange} />);
    await user.click(screen.getByLabelText('Accept terms'));

    expect(screen.getByLabelText('Accept terms')).toBeDisabled();
    expect(onChange).not.toHaveBeenCalled();
  });

  it('applies className to the field root and checkboxRootClassName to the Checkbox root wrapper', () => {
    const { container } = render(
      <CheckboxField
        id="terms"
        label="Accept terms"
        className="custom-field"
        checkboxRootClassName="custom-checkbox-root"
      />,
    );

    expect(container.firstChild).toHaveClass('custom-field');
    expect(screen.getByLabelText('Accept terms').parentElement).toHaveClass('custom-checkbox-root');
  });

  it('passes through native checkbox attributes', () => {
    render(<CheckboxField id="terms" label="Accept terms" name="terms" value="yes" />);

    const checkbox = screen.getByLabelText('Accept terms');
    expect(checkbox).toHaveAttribute('name', 'terms');
    expect(checkbox).toHaveAttribute('value', 'yes');
  });
});
