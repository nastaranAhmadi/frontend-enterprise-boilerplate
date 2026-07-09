import { describe, expect, it } from 'vitest';

import { getTrackClassName } from './Switch.styles';

describe('getTrackClassName', () => {
  it('uses logical start positioning and rtl-aware checked translation', () => {
    const className = getTrackClassName({ size: 'medium' });

    expect(className).toContain('after:start-0.5');
    expect(className).not.toContain('after:left-');
    expect(className).toContain('peer-checked:after:translate-x-5');
    expect(className).toContain('rtl:peer-checked:after:-translate-x-5');
  });

  it('applies size-specific rtl translation values', () => {
    expect(getTrackClassName({ size: 'small' })).toContain('rtl:peer-checked:after:-translate-x-4');
    expect(getTrackClassName({ size: 'large' })).toContain('rtl:peer-checked:after:-translate-x-7');
  });
});
