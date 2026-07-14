import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { FileInputField } from './FileInputField';

describe('FileInputField', () => {
  it('wires label, helper text, and error messaging', () => {
    render(
      <FileInputField
        id="attachments"
        label="Attachments"
        helperText="Upload files up to 1 MB."
        error="Upload failed, please try again"
        hint="SVG, PNG, JPG or GIF"
      />,
    );

    const control = screen.getByLabelText('Attachments');
    expect(control).toHaveAttribute('id', 'attachments');
    expect(control).toHaveAttribute('aria-describedby', 'attachments-helper attachments-error');
    expect(screen.getByText('Upload files up to 1 MB.')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent('Upload failed, please try again');
  });
});
