import { describe, expect, it } from 'vitest';

import { computeTooltipPosition } from './Tooltip.position';

const rect = (values: Partial<DOMRect>): DOMRect => ({
  x: values.left ?? 0,
  y: values.top ?? 0,
  width: values.width ?? 0,
  height: values.height ?? 0,
  top: values.top ?? 0,
  left: values.left ?? 0,
  right: values.right ?? 0,
  bottom: values.bottom ?? 0,
  toJSON: () => ({}),
});

describe('computeTooltipPosition', () => {
  it('positions tooltip above the anchor for top placement', () => {
    const position = computeTooltipPosition({
      anchorRect: rect({ top: 100, left: 100, width: 40, height: 20, right: 140, bottom: 120 }),
      tooltipRect: rect({ width: 80, height: 32 }),
      placement: 'top',
      gap: 8,
    });

    expect(position.top).toBe(60);
    expect(position.left).toBe(80);
  });

  it('positions tooltip below the anchor for bottom placement', () => {
    const position = computeTooltipPosition({
      anchorRect: rect({ top: 100, left: 100, width: 40, height: 20, right: 140, bottom: 120 }),
      tooltipRect: rect({ width: 80, height: 32 }),
      placement: 'bottom',
      gap: 8,
    });

    expect(position.top).toBe(128);
    expect(position.left).toBe(80);
  });
});
