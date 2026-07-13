import { ApiError } from '@enterprise/errors';
import { describe, expect, it, vi } from 'vitest';

import { createApiClient } from './create-api-client';

describe('createApiClient', () => {
  it('performs a JSON GET request', async () => {
    const fetchFn = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    );

    const client = createApiClient({ baseUrl: 'https://api.example.com', fetchFn });
    const result = await client.request<{ ok: boolean }>({ path: '/health' });

    expect(result).toEqual({ ok: true });
    expect(fetchFn).toHaveBeenCalledWith(
      'https://api.example.com/health',
      expect.objectContaining({ method: 'GET' }),
    );
  });

  it('throws ApiError for non-2xx responses', async () => {
    const fetchFn = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ message: 'Not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      }),
    );

    const client = createApiClient({ fetchFn });

    await expect(client.request({ path: '/missing' })).rejects.toBeInstanceOf(ApiError);
  });
});
