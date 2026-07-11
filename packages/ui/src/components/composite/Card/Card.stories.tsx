import type { ComponentProps, ReactElement } from 'react';

import { Button } from '../../base/Button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './Card';

const meta = {
  title: 'Composite/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
    docs: {
      description: {
        component: 'Composable surface for grouped content with optional header, body, and footer.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['outlined', 'elevated'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    interactive: { control: 'boolean' },
    className: { control: false },
  },
  args: {
    variant: 'outlined',
    size: 'medium',
    interactive: false,
  },
  decorators: [
    (Story: () => ReactElement) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type CardStory = {
  args?: Partial<ComponentProps<typeof Card>>;
  render?: (args: ComponentProps<typeof Card>) => ReactElement;
};

export const Playground: CardStory = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Project status</CardTitle>
        <CardDescription>Deployment summary for the latest release.</CardDescription>
      </CardHeader>
      <CardContent>All checks passed and the rollout completed successfully.</CardContent>
      <CardFooter>
        <Button size="small">View details</Button>
      </CardFooter>
    </Card>
  ),
};

export const Variants: CardStory = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Card {...args} variant="outlined">
        <CardTitle>Outlined</CardTitle>
        <CardContent>Bordered card surface.</CardContent>
      </Card>
      <Card {...args} variant="elevated">
        <CardTitle>Elevated</CardTitle>
        <CardContent>Shadowed card surface.</CardContent>
      </Card>
    </div>
  ),
};

export const Sizes: CardStory = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Card {...args} size="small">
        <CardTitle>Small</CardTitle>
      </Card>
      <Card {...args} size="medium">
        <CardTitle>Medium</CardTitle>
      </Card>
      <Card {...args} size="large">
        <CardTitle>Large</CardTitle>
      </Card>
    </div>
  ),
};

export const Interactive: CardStory = {
  args: {
    interactive: true,
  },
  render: (args) => (
    <Card {...args} onClick={() => undefined}>
      <CardTitle>Interactive card</CardTitle>
      <CardDescription>Focusable surface for clickable cards.</CardDescription>
    </Card>
  ),
};
