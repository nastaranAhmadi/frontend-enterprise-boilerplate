import { describe, expect, it } from 'vitest';

import type { Product } from '@/repositories/product/product.types';

import { GET } from '../../../app/api/products/search/route';

describe('GET /api/products/search', () => {
  it('returns 400 for invalid search parameters', async () => {
    const response = await GET(new Request('http://localhost/api/products/search?q=desk'));

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({ error: 'Invalid search parameters.' });
  });

  it('returns products for a valid locale and query', async () => {
    const response = await GET(
      new Request('http://localhost/api/products/search?locale=en&q=platform'),
    );

    expect(response.status).toBe(200);

    const products = (await response.json()) as Product[];
    expect(Array.isArray(products)).toBe(true);
    expect(products.length).toBeGreaterThan(0);

    const [first] = products;
    expect(first?.id).toEqual(expect.any(String));
    expect(first?.name).toEqual(expect.any(String));
  });
});
