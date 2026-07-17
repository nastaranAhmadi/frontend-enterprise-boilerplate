import type { ReactElement } from 'react';
import { useState } from 'react';

import type { RouteTransitionDirection } from './RouteTransition.types';
import { RouteTransitionOverlay } from './RouteTransitionOverlay';

const DEFAULT_MESSAGE = 'Loading your workspace';

export default {
  title: 'Composite/RouteTransition',
  component: RouteTransitionOverlay,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    message: DEFAULT_MESSAGE,
    visible: true,
    direction: 'bottom',
  },
  argTypes: {
    direction: {
      control: 'select',
      options: ['bottom', 'top', 'left', 'right'],
    },
    blurBackdrop: {
      control: 'boolean',
    },
    loadingVariant: {
      control: 'select',
      options: [
        'dots-3',
        'dot-bounce',
        'dots-5',
        'typing',
        'dot-matrix',
        'dots-bounce',
        'circular',
        'grid',
      ],
    },
    loadingSize: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
};

export const Visible = {};

export const BlurredBackdrop = {
  args: {
    blurBackdrop: true,
  },
};

export const CustomMessage = {
  args: {
    message: 'Syncing dashboard data',
  },
};

export const FromBottom = {
  args: {
    direction: 'bottom',
  },
};

export const FromTop = {
  args: {
    direction: 'top',
  },
};

export const FromLeft = {
  args: {
    direction: 'left',
  },
};

export const FromRight = {
  args: {
    direction: 'right',
  },
};

export const InteractiveDemo = {
  render: () => {
    const Demo = (): ReactElement => {
      const [visible, setVisible] = useState(false);
      const [direction, setDirection] = useState<RouteTransitionDirection>('bottom');
      const [blurBackdrop, setBlurBackdrop] = useState(true);

      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-md bg-background p-xl">
          <label className="flex items-center gap-sm font-sans text-sm text-foreground">
            Direction
            <select
              className="rounded-md border border-border bg-background px-sm py-xs"
              value={direction}
              onChange={(event) => {
                setDirection(event.target.value as RouteTransitionDirection);
              }}
            >
              <option value="bottom">Bottom</option>
              <option value="top">Top</option>
              <option value="left">Left</option>
              <option value="right">Right</option>
            </select>
          </label>
          <label className="flex items-center gap-sm font-sans text-sm text-foreground">
            Blur backdrop
            <input
              type="checkbox"
              checked={blurBackdrop}
              onChange={(event) => {
                setBlurBackdrop(event.target.checked);
              }}
            />
          </label>
          <button
            type="button"
            className="rounded-md border border-border px-md py-sm"
            onClick={() => {
              setVisible(true);
              window.setTimeout(() => {
                setVisible(false);
              }, 1200);
            }}
          >
            Simulate route change
          </button>
          <RouteTransitionOverlay
            visible={visible}
            direction={direction}
            blurBackdrop={blurBackdrop}
            message={DEFAULT_MESSAGE}
          />
        </div>
      );
    };

    return <Demo />;
  },
};
