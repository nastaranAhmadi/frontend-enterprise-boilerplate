import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { TextareaField } from './TextareaField';

describe('TextareaField', () => {
  it('renders label, textarea, and helper text', () => {
    render(
      <TextareaField
        id="bio"
        label="Bio"
        helperText="Tell us a little about yourself."
        placeholder="Write your bio"
      />,
    );

    expect(screen.getByLabelText('Bio')).toBeInTheDocument();
    expect(screen.getByText('Tell us a little about yourself.')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Write your bio')).toBeInTheDocument();
  });

  it('forwards ref to the native textarea element', () => {
    const ref = createRef<HTMLTextAreaElement>();
    render(<TextareaField ref={ref} id="bio" label="Bio" />);
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });

  it('wires label htmlFor to textarea id', () => {
    render(<TextareaField id="bio" label="Bio" />);
    expect(screen.getByLabelText('Bio')).toHaveAttribute('id', 'bio');
  });

  it('generates ids when id is omitted', () => {
    render(<TextareaField label="Bio" helperText="Helper" error="Error" />);

    const textarea = screen.getByLabelText('Bio');
    const textareaId = textarea.id;
    expect(textareaId).toBeTruthy();

    expect(screen.getByText('Helper')).toHaveAttribute('id', `${textareaId}-helper`);
    expect(screen.getByRole('alert')).toHaveAttribute('id', `${textareaId}-error`);
  });

  it('wires aria-describedby to helper text', () => {
    render(<TextareaField id="bio" label="Bio" helperText="Tell us a little about yourself." />);

    expect(screen.getByLabelText('Bio')).toHaveAttribute('aria-describedby', 'bio-helper');
    expect(screen.getByText('Tell us a little about yourself.')).toHaveAttribute(
      'id',
      'bio-helper',
    );
  });

  it('wires aria-describedby to helper text and error message', () => {
    render(
      <TextareaField
        id="bio"
        label="Bio"
        helperText="Tell us a little about yourself."
        error="Bio is required."
      />,
    );

    expect(screen.getByLabelText('Bio')).toHaveAttribute(
      'aria-describedby',
      'bio-helper bio-error',
    );
    expect(screen.getByRole('alert')).toHaveTextContent('Bio is required.');
  });

  it('merges consumer aria-describedby with generated ids', () => {
    render(
      <TextareaField
        id="bio"
        label="Bio"
        helperText="Helper"
        aria-describedby="external-description"
      />,
    );

    expect(screen.getByLabelText('Bio')).toHaveAttribute(
      'aria-describedby',
      'bio-helper external-description',
    );
  });

  it('sets aria-invalid when error is present', () => {
    render(<TextareaField id="bio" label="Bio" error="Bio is required." />);

    expect(screen.getByLabelText('Bio')).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('alert')).toHaveTextContent('Bio is required.');
  });

  it('does not set aria-invalid when there is no error', () => {
    render(<TextareaField id="bio" label="Bio" helperText="Helper" />);
    expect(screen.getByLabelText('Bio')).not.toHaveAttribute('aria-invalid');
  });

  it('renders required indicator on the label', () => {
    render(<TextareaField id="bio" label="Bio" required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('disables the textarea when disabled', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<TextareaField id="bio" label="Bio" disabled onChange={onChange} />);
    await user.type(screen.getByLabelText('Bio'), 'a');

    expect(screen.getByLabelText('Bio')).toBeDisabled();
    expect(onChange).not.toHaveBeenCalled();
  });

  it('applies className to the field root and textareaRootClassName to the Textarea root wrapper', () => {
    const { container } = render(
      <TextareaField
        id="bio"
        label="Bio"
        className="custom-field"
        textareaRootClassName="custom-textarea-root"
      />,
    );

    expect(container.firstChild).toHaveClass('custom-field');
    expect(screen.getByLabelText('Bio').parentElement?.parentElement).toHaveClass(
      'custom-textarea-root',
    );
  });

  it('passes through native textarea attributes', () => {
    render(<TextareaField id="bio" label="Bio" name="bio" rows={4} placeholder="Write your bio" />);

    const textarea = screen.getByLabelText('Bio');
    expect(textarea).toHaveAttribute('name', 'bio');
    expect(textarea).toHaveAttribute('rows', '4');
    expect(textarea).toHaveAttribute('placeholder', 'Write your bio');
  });
});
