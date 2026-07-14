import type { ComponentProps, ReactElement } from 'react';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './Table';

const meta = {
  title: 'Composite/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'Semantic table primitives for tabular data with size, striped, bordered, and responsive layout variants. Use `layout="stacked"` with `label` on `TableCell` for card-style rows below the `md` breakpoint.',
      },
    },
  },
  argTypes: {
    layout: {
      control: 'select',
      options: ['scroll', 'stacked'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    striped: { control: 'boolean' },
    bordered: { control: 'boolean' },
    className: { control: false },
    wrapperClassName: { control: false },
  },
  args: {
    size: 'medium',
    striped: false,
    bordered: false,
    layout: 'scroll',
  },
  decorators: [
    (Story: () => ReactElement) => (
      <div style={{ width: 640 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type TableStory = {
  args?: Partial<ComponentProps<typeof Table>>;
  render?: (args: ComponentProps<typeof Table>) => ReactElement;
  parameters?: Record<string, unknown>;
};

const sampleRows = [
  { name: 'Ada Lovelace', role: 'Engineer', status: 'Active' },
  { name: 'Grace Hopper', role: 'Architect', status: 'Active' },
  { name: 'Katherine Johnson', role: 'Analyst', status: 'Away' },
];

const SampleTable = (args: ComponentProps<typeof Table>) => (
  <Table {...args}>
    <TableHeader>
      <TableRow>
        <TableHead>Name</TableHead>
        <TableHead>Role</TableHead>
        <TableHead>Status</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {sampleRows.map((row) => (
        <TableRow key={row.name}>
          <TableCell>{row.name}</TableCell>
          <TableCell>{row.role}</TableCell>
          <TableCell>{row.status}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

const StackedTable = (args: ComponentProps<typeof Table>) => (
  <Table {...args} layout="stacked">
    <TableHeader>
      <TableRow>
        <TableHead>Name</TableHead>
        <TableHead>Role</TableHead>
        <TableHead>Status</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {sampleRows.map((row) => (
        <TableRow key={row.name}>
          <TableCell label="Name">{row.name}</TableCell>
          <TableCell label="Role">{row.role}</TableCell>
          <TableCell label="Status">{row.status}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export const Playground: TableStory = {
  render: (args) => <SampleTable {...args} />,
};

export const Stacked: TableStory = {
  args: { layout: 'stacked', bordered: true },
  render: (args) => <StackedTable {...args} />,
  parameters: {
    docs: {
      description: {
        story:
          'Below the `md` breakpoint each row becomes a card. Pass `label` to every `TableCell`.',
      },
    },
  },
};

export const Striped: TableStory = {
  args: { striped: true },
  render: (args) => <SampleTable {...args} />,
};

export const Bordered: TableStory = {
  args: { bordered: true },
  render: (args) => <SampleTable {...args} />,
};

export const Sizes: TableStory = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <SampleTable size="small" />
      <SampleTable size="medium" />
      <SampleTable size="large" />
    </div>
  ),
};
