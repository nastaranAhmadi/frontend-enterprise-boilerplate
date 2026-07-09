import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Select } from './Select';

const countryChildren = (
  <>
    <option value="us">United States</option>
    <option value="ca">Canada</option>
    <option value="mx">Mexico</option>
  </>
);

describe('Select', () => {
  it('renders a native select', () => {
    render(<Select aria-label="Country">{countryChildren}</Select>);
    expect(screen.getByRole('combobox', { name: 'Country' })).toBeInTheDocument();
  });

  it('forwards ref to the native select element', () => {
    const ref = createRef<HTMLSelectElement>();
    render(
      <Select ref={ref} aria-label="Country">
        {countryChildren}
      </Select>,
    );
    expect(ref.current).toBeInstanceOf(HTMLSelectElement);
  });

  it('calls onChange when enabled', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <Select aria-label="Country" onChange={onChange}>
        {countryChildren}
      </Select>,
    );
    await user.selectOptions(screen.getByRole('combobox', { name: 'Country' }), 'ca');

    expect(onChange).toHaveBeenCalled();
  });

  it('does not call onChange when disabled', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <Select aria-label="Country" disabled onChange={onChange}>
        {countryChildren}
      </Select>,
    );
    await user.selectOptions(screen.getByRole('combobox', { name: 'Country' }), 'ca');

    expect(onChange).not.toHaveBeenCalled();
  });

  it('exposes aria-invalid only when invalid', () => {
    const { rerender } = render(
      <Select aria-label="Country" invalid={false}>
        {countryChildren}
      </Select>,
    );
    expect(screen.getByRole('combobox', { name: 'Country' })).not.toHaveAttribute('aria-invalid');

    rerender(
      <Select aria-label="Country" invalid>
        {countryChildren}
      </Select>,
    );
    expect(screen.getByRole('combobox', { name: 'Country' })).toHaveAttribute(
      'aria-invalid',
      'true',
    );
  });

  it('renders start and end adornments', () => {
    render(
      <Select
        aria-label="Country"
        startAdornment={<span data-testid="start-adornment" />}
        endAdornment={<span data-testid="end-adornment" />}
      >
        {countryChildren}
      </Select>,
    );

    expect(screen.getByTestId('start-adornment')).toBeInTheDocument();
    expect(screen.getByTestId('end-adornment')).toBeInTheDocument();
  });

  it('applies className to the root wrapper', () => {
    const { container } = render(
      <Select aria-label="Country" className="custom-root">
        {countryChildren}
      </Select>,
    );
    expect(container.firstChild).toHaveClass('custom-root');
  });

  it('passes through native select attributes', () => {
    render(
      <Select aria-label="Country" name="country" autoComplete="country">
        {countryChildren}
      </Select>,
    );
    const select = screen.getByRole('combobox', { name: 'Country' });

    expect(select).toHaveAttribute('name', 'country');
    expect(select).toHaveAttribute('autocomplete', 'country');
  });

  it('renders children', () => {
    render(
      <Select aria-label="Country">
        <option value="us">United States</option>
      </Select>,
    );

    expect(screen.getByRole('option', { name: 'United States' })).toHaveValue('us');
  });

  it('applies disabled styling to the native select element', () => {
    render(
      <Select aria-label="Country" disabled>
        {countryChildren}
      </Select>,
    );

    expect(screen.getByRole('combobox', { name: 'Country' })).toHaveClass('disabled:opacity-50');
  });

  it('keeps controlled props after native spread', () => {
    render(
      <Select aria-label="Country" disabled={false} aria-invalid={false}>
        {countryChildren}
      </Select>,
    );

    const select = screen.getByRole('combobox', { name: 'Country' });
    expect(select).not.toBeDisabled();
    expect(select).not.toHaveAttribute('aria-invalid');
  });
});
