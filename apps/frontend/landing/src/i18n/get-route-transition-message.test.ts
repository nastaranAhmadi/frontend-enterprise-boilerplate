import { describe, expect, it } from 'vitest';

import { getRouteTransitionMessage } from './get-route-transition-message';

describe('getRouteTransitionMessage', () => {
  it('returns localized copy per locale', () => {
    expect(getRouteTransitionMessage('en')).toBe('Hang in there sailor');
    expect(getRouteTransitionMessage('fa')).toBe('صبور باش، داریم می‌ریم');
  });
});
