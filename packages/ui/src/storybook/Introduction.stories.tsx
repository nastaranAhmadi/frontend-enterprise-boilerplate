import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Introduction',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Welcome: Story = {
  render: () => (
    <div className="max-w-2xl space-y-4 font-sans text-foreground">
      <h1 className="text-2xl font-medium">Enterprise UI</h1>
      <p>
        <code>@enterprise/ui</code> is the browser-only design system for this monorepo. It ships
        React primitives, composed patterns, semantic Tailwind styling, and Storybook documentation.
      </p>

      <h2 className="text-lg font-medium">Getting started</h2>
      <pre className="overflow-x-auto rounded-md bg-muted p-md text-sm">pnpm nx storybook ui</pre>
      <p>
        Storybook runs at{' '}
        <a className="text-primary underline" href="http://localhost:3000">
          http://localhost:3000
        </a>
        .
      </p>
      <p>
        Wrap application routes with <code>DesignSystemProvider</code> so theme tokens resolve
        correctly. Pass <code>locale</code> (and optional <code>dir</code>) for RTL layouts.
      </p>

      <h2 className="text-lg font-medium">Locale and direction</h2>
      <p>
        Use the Storybook toolbar to switch <strong>Theme</strong>, <strong>Locale</strong>, and{' '}
        <strong>Direction</strong>. Translations live in <code>@enterprise/i18n</code>; the UI
        library receives copy via props. See <code>Composite/RTL</code> for form mirroring checks.
      </p>

      <h2 className="text-lg font-medium">Layers</h2>
      <ul className="list-disc space-y-1 ps-md">
        <li>
          <strong>Base</strong> — foundational primitives such as Button, Input, and Label
        </li>
        <li>
          <strong>Composite</strong> — composed patterns such as FormField, Modal, and Table
        </li>
        <li>
          <strong>Templates</strong> — component conventions under{' '}
          <code>src/components/templates/</code>
        </li>
      </ul>

      <h2 className="text-lg font-medium">Accessibility</h2>
      <ul className="list-disc space-y-1 ps-md">
        <li>Use the Accessibility panel in Storybook to audit stories.</li>
        <li>Overlays implement focus trapping, scroll locking, and Escape dismissal.</li>
        <li>Field composites share FieldShell for label, helper, and error wiring.</li>
      </ul>
    </div>
  ),
};
