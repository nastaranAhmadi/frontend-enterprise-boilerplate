import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Radio } from '../../base/Radio';
import { RadioGroup } from './RadioGroup';

describe('RadioGroup', () => {
  it('renders group label, options, and helper text', () => {
    render(
      <RadioGroup name="plan" label="Choose a plan" helperText="Select one option.">
        <Radio value="free" label="Free" />
        <Radio value="pro" label="Pro" />
      </RadioGroup>,
    );

    expect(screen.getByText('Choose a plan')).toBeInTheDocument();
    expect(screen.getByLabelText('Free')).toBeInTheDocument();
    expect(screen.getByLabelText('Pro')).toBeInTheDocument();
    expect(screen.getByText('Select one option.')).toBeInTheDocument();
  });

  it('shares the group name across radios', () => {
    render(
      <RadioGroup name="plan" label="Choose a plan">
        <Radio value="free" label="Free" />
        <Radio value="pro" label="Pro" />
      </RadioGroup>,
    );

    expect(screen.getByLabelText('Free')).toHaveAttribute('name', 'plan');
    expect(screen.getByLabelText('Pro')).toHaveAttribute('name', 'plan');
  });

  it('selects a radio option on click', async () => {
    const user = userEvent.setup();

    render(
      <RadioGroup name="plan" label="Choose a plan">
        <Radio value="free" label="Free" />
        <Radio value="pro" label="Pro" />
      </RadioGroup>,
    );

    await user.click(screen.getByLabelText('Pro'));
    expect(screen.getByLabelText('Pro')).toBeChecked();
    expect(screen.getByLabelText('Free')).not.toBeChecked();
  });

  it('wires aria-describedby on the fieldset to helper text', () => {
    render(
      <RadioGroup name="plan" label="Choose a plan" helperText="Select one option.">
        <Radio value="free" label="Free" />
      </RadioGroup>,
    );

    const helper = screen.getByText('Select one option.');
    expect(screen.getByRole('group')).toHaveAttribute('aria-describedby', helper.id);
    expect(helper).toHaveAttribute('id');
  });

  it('renders error message and sets aria-invalid on the fieldset', () => {
    render(
      <RadioGroup name="plan" label="Choose a plan" error="Please choose a plan.">
        <Radio value="free" label="Free" />
        <Radio value="pro" label="Pro" />
      </RadioGroup>,
    );

    const error = screen.getByRole('alert');
    expect(error).toHaveTextContent('Please choose a plan.');
    expect(screen.getByRole('group')).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByRole('group')).toHaveAttribute('aria-describedby', error.id);
    expect(screen.getByLabelText('Free')).toHaveClass('border-error');
    expect(screen.getByLabelText('Pro')).toHaveClass('border-error');
  });

  it('renders required indicator on the legend', () => {
    render(
      <RadioGroup name="plan" label="Choose a plan" required>
        <Radio value="free" label="Free" />
      </RadioGroup>,
    );

    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('disables all radios when disabled', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <RadioGroup name="plan" label="Choose a plan" disabled onChange={onChange}>
        <Radio value="free" label="Free" />
      </RadioGroup>,
    );

    await user.click(screen.getByLabelText('Free'));
    expect(screen.getByLabelText('Free')).toBeDisabled();
    expect(onChange).not.toHaveBeenCalled();
  });

  it('supports controlled value', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    const { rerender } = render(
      <RadioGroup name="plan" label="Choose a plan" value="free" onChange={onChange}>
        <Radio value="free" label="Free" />
        <Radio value="pro" label="Pro" />
      </RadioGroup>,
    );

    expect(screen.getByLabelText('Free')).toBeChecked();
    expect(screen.getByLabelText('Pro')).not.toBeChecked();

    rerender(
      <RadioGroup name="plan" label="Choose a plan" value="pro" onChange={onChange}>
        <Radio value="free" label="Free" />
        <Radio value="pro" label="Pro" />
      </RadioGroup>,
    );

    expect(screen.getByLabelText('Pro')).toBeChecked();

    await user.click(screen.getByLabelText('Free'));
    expect(onChange).toHaveBeenCalled();
  });

  it('applies className to the field root', () => {
    const { container } = render(
      <RadioGroup name="plan" label="Choose a plan" className="custom-field">
        <Radio value="free" label="Free" />
      </RadioGroup>,
    );

    expect(container.firstChild).toHaveClass('custom-field');
  });
});
