import type { ComponentProps, ReactElement } from 'react';
import { useState } from 'react';

import { Button } from '../../base/Button';
import { Accordion } from './index';

const LOREM =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.';

const meta = {
  title: 'Composite/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'Material UI-style accordion for showing and hiding related content. Compose with `Accordion.Summary`, `Accordion.Details`, and optional `Accordion.Actions`. Use `Accordion.Group` for stacked panels with shared borders.',
      },
    },
  },
  argTypes: {
    className: { control: false },
    children: { control: false },
    expanded: { control: false },
    onChange: { control: false },
    headingAs: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    },
  },
  args: {
    defaultExpanded: false,
    disabled: false,
    headingAs: 'h3',
    unmountOnExit: false,
  },
};

export default meta;

type StoryProps = ComponentProps<typeof Accordion>;

const BasicAccordion = (props: StoryProps): ReactElement => (
  <Accordion className="max-w-xl" {...props}>
    <Accordion.Summary>Accordion 1</Accordion.Summary>
    <Accordion.Details>{LOREM}</Accordion.Details>
  </Accordion>
);

export const Default = {
  render: (args: StoryProps) => <BasicAccordion {...args} />,
};

export const ExpandedByDefault = {
  render: (args: StoryProps) => <BasicAccordion {...args} defaultExpanded />,
};

export const Disabled = {
  render: (args: StoryProps) => <BasicAccordion {...args} disabled />,
};

export const WithActions = {
  render: (args: StoryProps) => (
    <Accordion className="max-w-xl" {...args}>
      <Accordion.Summary>Accordion actions</Accordion.Summary>
      <Accordion.Details>{LOREM}</Accordion.Details>
      <Accordion.Actions>
        <Button variant="ghost">Cancel</Button>
        <Button>Agree</Button>
      </Accordion.Actions>
    </Accordion>
  ),
};

export const Grouped = {
  render: () => (
    <Accordion.Group className="max-w-xl">
      <Accordion defaultExpanded>
        <Accordion.Summary>Accordion 1</Accordion.Summary>
        <Accordion.Details>{LOREM}</Accordion.Details>
      </Accordion>
      <Accordion>
        <Accordion.Summary>Accordion 2</Accordion.Summary>
        <Accordion.Details>{LOREM}</Accordion.Details>
      </Accordion>
      <Accordion disabled>
        <Accordion.Summary>Disabled accordion</Accordion.Summary>
        <Accordion.Details>{LOREM}</Accordion.Details>
      </Accordion>
    </Accordion.Group>
  ),
};

export const SingleExpanded = {
  render: () => {
    const SingleExpandedExample = () => {
      const [expanded, setExpanded] = useState<string | false>('panel-1');

      const handleChange =
        (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
          setExpanded(isExpanded ? panel : false);
        };

      return (
        <Accordion.Group className="max-w-xl">
          <Accordion expanded={expanded === 'panel-1'} onChange={handleChange('panel-1')}>
            <Accordion.Summary>Collapsible group item #1</Accordion.Summary>
            <Accordion.Details>{LOREM}</Accordion.Details>
          </Accordion>
          <Accordion expanded={expanded === 'panel-2'} onChange={handleChange('panel-2')}>
            <Accordion.Summary>Collapsible group item #2</Accordion.Summary>
            <Accordion.Details>{LOREM}</Accordion.Details>
          </Accordion>
          <Accordion expanded={expanded === 'panel-3'} onChange={handleChange('panel-3')}>
            <Accordion.Summary>Collapsible group item #3</Accordion.Summary>
            <Accordion.Details>{LOREM}</Accordion.Details>
          </Accordion>
        </Accordion.Group>
      );
    };

    return <SingleExpandedExample />;
  },
};

export const UnmountOnExit = {
  render: (args: StoryProps) => (
    <Accordion className="max-w-xl" {...args} unmountOnExit>
      <Accordion.Summary>Unmount on exit</Accordion.Summary>
      <Accordion.Details>{LOREM}</Accordion.Details>
    </Accordion>
  ),
};
