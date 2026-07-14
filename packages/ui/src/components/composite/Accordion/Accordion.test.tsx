import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ComponentProps } from 'react';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Button } from '../../base/Button';
import { Accordion } from './index';

const LOREM =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.';

const renderAccordion = (props: Partial<ComponentProps<typeof Accordion>> = {}) =>
  render(
    <Accordion {...props}>
      <Accordion.Summary>Accordion 1</Accordion.Summary>
      <Accordion.Details>{LOREM}</Accordion.Details>
    </Accordion>,
  );

describe('Accordion', () => {
  it('renders summary and collapsed details region', () => {
    renderAccordion();

    expect(screen.getByRole('button', { name: 'Accordion 1' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
    expect(screen.getByRole('region', { hidden: true })).toHaveTextContent(LOREM);
  });

  it('expands and collapses when the summary is clicked', async () => {
    const user = userEvent.setup();
    renderAccordion();

    const summary = screen.getByRole('button', { name: 'Accordion 1' });

    await user.click(summary);
    expect(summary).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('region')).toBeVisible();

    await user.click(summary);
    expect(summary).toHaveAttribute('aria-expanded', 'false');
  });

  it('supports defaultExpanded', () => {
    renderAccordion({ defaultExpanded: true });

    expect(screen.getByRole('button', { name: 'Accordion 1' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
    expect(screen.getByRole('region')).toBeVisible();
  });

  it('calls onChange in controlled mode', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    const ControlledAccordion = () => {
      const [expanded, setExpanded] = useState(false);

      return (
        <Accordion
          expanded={expanded}
          onChange={(event, nextExpanded) => {
            setExpanded(nextExpanded);
            onChange(event, nextExpanded);
          }}
        >
          <Accordion.Summary>Controlled</Accordion.Summary>
          <Accordion.Details>{LOREM}</Accordion.Details>
        </Accordion>
      );
    };

    render(<ControlledAccordion />);

    await user.click(screen.getByRole('button', { name: 'Controlled' }));

    expect(onChange).toHaveBeenCalledWith(expect.any(Object), true);
    expect(screen.getByRole('region')).toBeVisible();
  });

  it('does not toggle when disabled', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderAccordion({ disabled: true, onChange });

    await user.click(screen.getByRole('button', { name: 'Accordion 1' }));

    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByRole('button', { name: 'Accordion 1' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  });

  it('unmounts details content when unmountOnExit is enabled', async () => {
    const user = userEvent.setup();
    render(
      <Accordion unmountOnExit>
        <Accordion.Summary>Accordion 1</Accordion.Summary>
        <Accordion.Details>{LOREM}</Accordion.Details>
      </Accordion>,
    );

    expect(screen.queryByText(LOREM)).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Accordion 1' }));
    expect(screen.getByText(LOREM)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Accordion 1' }));
    expect(screen.queryByText(LOREM)).not.toBeInTheDocument();
  });

  it('renders actions only when expanded', async () => {
    const user = userEvent.setup();

    render(
      <Accordion>
        <Accordion.Summary>Accordion actions</Accordion.Summary>
        <Accordion.Details>{LOREM}</Accordion.Details>
        <Accordion.Actions>
          <Button variant="ghost">Cancel</Button>
          <Button>Agree</Button>
        </Accordion.Actions>
      </Accordion>,
    );

    expect(screen.queryByRole('button', { name: 'Agree' })).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Accordion actions' }));

    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Agree' })).toBeInTheDocument();
  });

  it('supports grouped accordions without duplicate borders', () => {
    render(
      <Accordion.Group>
        <Accordion>
          <Accordion.Summary>Item 1</Accordion.Summary>
          <Accordion.Details>Content 1</Accordion.Details>
        </Accordion>
        <Accordion>
          <Accordion.Summary>Item 2</Accordion.Summary>
          <Accordion.Details>Content 2</Accordion.Details>
        </Accordion>
      </Accordion.Group>,
    );

    expect(screen.getByRole('button', { name: 'Item 1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Item 2' })).toBeInTheDocument();
  });

  it('throws when compound components are used outside Accordion', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined);

    expect(() => render(<Accordion.Summary>Outside</Accordion.Summary>)).toThrow(
      'Accordion compound components must be used within Accordion.',
    );

    consoleError.mockRestore();
  });
});
