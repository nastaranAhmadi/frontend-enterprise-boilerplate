import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { SelectField } from './SelectField';

const countryChildren = (
  <>
    <option disabled value="">
      Choose a country
    </option>
    <option value="us">United States</option>
    <option value="ca">Canada</option>
  </>
);

describe('SelectField', () => {
  it('renders label, select, and helper text', () => {
    render(
      <SelectField id="country" label="Country" helperText="Select your country of residence.">
        {countryChildren}
      </SelectField>,
    );

    expect(screen.getByLabelText('Country')).toBeInTheDocument();
    expect(screen.getByText('Select your country of residence.')).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Choose a country' })).toBeInTheDocument();
  });

  it('forwards ref to the native select element', () => {
    const ref = createRef<HTMLSelectElement>();
    render(
      <SelectField ref={ref} id="country" label="Country">
        {countryChildren}
      </SelectField>,
    );
    expect(ref.current).toBeInstanceOf(HTMLSelectElement);
  });

  it('wires label htmlFor to select id', () => {
    render(
      <SelectField id="country" label="Country">
        {countryChildren}
      </SelectField>,
    );
    expect(screen.getByLabelText('Country')).toHaveAttribute('id', 'country');
  });

  it('generates ids when id is omitted', () => {
    render(
      <SelectField label="Country" helperText="Helper" error="Error">
        {countryChildren}
      </SelectField>,
    );

    const select = screen.getByLabelText('Country');
    const selectId = select.getAttribute('id');
    expect(selectId).toBeTruthy();

    expect(screen.getByText('Helper')).toHaveAttribute('id', `${String(selectId)}-helper`);
    expect(screen.getByRole('alert')).toHaveAttribute('id', `${String(selectId)}-error`);
  });

  it('wires aria-describedby to helper text', () => {
    render(
      <SelectField id="country" label="Country" helperText="Select your country of residence.">
        {countryChildren}
      </SelectField>,
    );

    expect(screen.getByLabelText('Country')).toHaveAttribute('aria-describedby', 'country-helper');
    expect(screen.getByText('Select your country of residence.')).toHaveAttribute(
      'id',
      'country-helper',
    );
  });

  it('wires aria-describedby to helper text and error message', () => {
    render(
      <SelectField
        id="country"
        label="Country"
        helperText="Select your country of residence."
        error="Country is required."
      >
        {countryChildren}
      </SelectField>,
    );

    expect(screen.getByLabelText('Country')).toHaveAttribute(
      'aria-describedby',
      'country-helper country-error',
    );
    expect(screen.getByRole('alert')).toHaveTextContent('Country is required.');
  });

  it('merges consumer aria-describedby with generated ids', () => {
    render(
      <SelectField
        id="country"
        label="Country"
        helperText="Helper"
        aria-describedby="external-description"
      >
        {countryChildren}
      </SelectField>,
    );

    expect(screen.getByLabelText('Country')).toHaveAttribute(
      'aria-describedby',
      'country-helper external-description',
    );
  });

  it('sets aria-invalid when error is present', () => {
    render(
      <SelectField id="country" label="Country" error="Country is required.">
        {countryChildren}
      </SelectField>,
    );

    expect(screen.getByLabelText('Country')).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('alert')).toHaveTextContent('Country is required.');
  });

  it('does not set aria-invalid when there is no error', () => {
    render(
      <SelectField id="country" label="Country" helperText="Helper">
        {countryChildren}
      </SelectField>,
    );
    expect(screen.getByLabelText('Country')).not.toHaveAttribute('aria-invalid');
  });

  it('renders required indicator on the label', () => {
    render(
      <SelectField id="country" label="Country" required>
        {countryChildren}
      </SelectField>,
    );
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('disables the select when disabled', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <SelectField id="country" label="Country" disabled onChange={onChange}>
        {countryChildren}
      </SelectField>,
    );
    await user.selectOptions(screen.getByLabelText('Country'), 'ca');

    expect(screen.getByLabelText('Country')).toBeDisabled();
    expect(onChange).not.toHaveBeenCalled();
  });

  it('applies className to the field root and selectRootClassName to the Select root wrapper', () => {
    const { container } = render(
      <SelectField
        id="country"
        label="Country"
        className="custom-field"
        selectRootClassName="custom-select-root"
      >
        {countryChildren}
      </SelectField>,
    );

    expect(container.firstChild).toHaveClass('custom-field');
    expect(screen.getByLabelText('Country').parentElement?.parentElement).toHaveClass(
      'custom-select-root',
    );
  });

  it('passes through native select attributes', () => {
    render(
      <SelectField id="country" label="Country" name="country" autoComplete="country">
        {countryChildren}
      </SelectField>,
    );

    const select = screen.getByLabelText('Country');
    expect(select).toHaveAttribute('name', 'country');
    expect(select).toHaveAttribute('autocomplete', 'country');
  });

  it('renders children', () => {
    render(
      <SelectField id="country" label="Country">
        <option value="us">United States</option>
      </SelectField>,
    );

    expect(screen.getByRole('option', { name: 'United States' })).toHaveValue('us');
  });
});
