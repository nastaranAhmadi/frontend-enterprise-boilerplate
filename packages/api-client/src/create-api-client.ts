import { ApiError } from '@enterprise/errors';

import type { ApiClient, ApiClientOptions, RequestConfig, RequestContext } from './index';

const joinUrl = (baseUrl: string, path: string): string => {
  if (!baseUrl) {
    return path;
  }

  const normalizedBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${normalizedBase}${normalizedPath}`;
};

const serializeBody = (
  body: RequestConfig['body'],
  headers: Headers,
): BodyInit | null | undefined => {
  if (body === undefined || body === null) {
    return undefined;
  }

  if (
    typeof body === 'string' ||
    body instanceof FormData ||
    body instanceof Blob ||
    body instanceof ArrayBuffer
  ) {
    return body;
  }

  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  return JSON.stringify(body);
};

export const createApiClient = (options: ApiClientOptions = {}): ApiClient => {
  const {
    baseUrl = '',
    defaultHeaders = {},
    middleware = [],
    fetchFn = globalThis.fetch.bind(globalThis),
  } = options;

  const request = async <TResponse>(config: RequestConfig): Promise<TResponse> => {
    const method = config.method ?? 'GET';
    const url = joinUrl(baseUrl, config.path);
    const headers = new Headers(defaultHeaders);

    if (config.headers) {
      Object.entries(config.headers).forEach(([key, value]) => {
        headers.set(key, value);
      });
    }

    const context: RequestContext = {
      url,
      method,
      headers,
      body: serializeBody(config.body, headers),
      signal: config.signal,
      timeoutMs: config.timeoutMs,
    };

    const runFetch = async (): Promise<Response> => {
      let signal = config.signal;
      let timeoutId: ReturnType<typeof setTimeout> | undefined;

      if (config.timeoutMs && !signal) {
        const controller = new AbortController();
        signal = controller.signal;
        timeoutId = setTimeout(() => {
          controller.abort();
        }, config.timeoutMs);
      }

      try {
        return await fetchFn(url, {
          method,
          headers,
          body: method === 'GET' || method === 'HEAD' ? undefined : context.body,
          signal,
        });
      } finally {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      }
    };

    const dispatch = async (index: number): Promise<Response> => {
      if (index < middleware.length) {
        const middlewareHandler = middleware[index];
        if (!middlewareHandler) {
          return runFetch();
        }
        return middlewareHandler(context, () => dispatch(index + 1));
      }

      return runFetch();
    };

    const response = await dispatch(0);

    if (!response.ok) {
      let message = response.statusText || 'Request failed';

      try {
        const errorBody: unknown = await response.json();
        if (
          typeof errorBody === 'object' &&
          errorBody !== null &&
          'message' in errorBody &&
          typeof errorBody.message === 'string'
        ) {
          message = errorBody.message;
        }
      } catch {
        // Response body is not JSON.
      }

      throw new ApiError(message, response.status);
    }

    if (response.status === 204 || method === 'HEAD') {
      return undefined as TResponse;
    }

    const contentType = response.headers.get('Content-Type') ?? '';
    if (!contentType.includes('application/json')) {
      return (await response.text()) as TResponse;
    }

    return (await response.json()) as TResponse;
  };

  return { request };
};
