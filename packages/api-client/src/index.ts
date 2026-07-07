import { ApiError, normalizeError } from '@enterprise/errors';
import type { Logger } from '@enterprise/logger';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS';

export type RequestContext = {
  url: string;
  method: HttpMethod;
  headers: Headers;
  body?: BodyInit | null;
  signal?: AbortSignal;
  timeoutMs?: number;
};

export type Middleware = (
  context: RequestContext,
  next: () => Promise<Response>,
) => Promise<Response>;

export type ApiClientOptions = {
  baseUrl?: string;
  defaultHeaders?: Record<string, string>;
  middleware?: Middleware[];
  logger?: Logger;
  fetchFn?: typeof fetch;
};

export type RequestConfig<TBody = unknown> = {
  path: string;
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: TBody;
  signal?: AbortSignal;
  timeoutMs?: number;
};

export type ApiClient = {
  request<TResponse>(config: RequestConfig): Promise<TResponse>;
};

function composeMiddleware(
  middleware: Middleware[],
  terminal: (context: RequestContext) => Promise<Response>,
): (context: RequestContext) => Promise<Response> {
  return middleware.reduceRight<(context: RequestContext) => Promise<Response>>(
    (next, layer) => async (context) => layer(context, () => next(context)),
    terminal,
  );
}

export function createTimeoutSignal(timeoutMs: number, parent?: AbortSignal): AbortSignal {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, timeoutMs);

  if (parent) {
    parent.addEventListener(
      'abort',
      () => {
        controller.abort();
      },
      { once: true },
    );
  }

  controller.signal.addEventListener(
    'abort',
    () => {
      clearTimeout(timeoutId);
    },
    { once: true },
  );
  return controller.signal;
}

export function createRetryMiddleware(maxRetries = 2, delayMs = 300): Middleware {
  return async (_context, next) => {
    let attempt = 0;

    for (;;) {
      try {
        return await next();
      } catch (error) {
        if (attempt >= maxRetries) throw error;
        attempt += 1;
        await new Promise((resolve) => setTimeout(resolve, delayMs * attempt));
      }
    }
  };
}

export function createAuthMiddleware(getToken: () => string | undefined): Middleware {
  return async (context, next) => {
    const token = getToken();
    if (token) {
      context.headers.set('Authorization', `Bearer ${token}`);
    }
    return next();
  };
}

export function createApiClient(options: ApiClientOptions = {}): ApiClient {
  const fetchFn = options.fetchFn ?? fetch;

  return {
    async request<TResponse>(config: RequestConfig): Promise<TResponse> {
      const url = `${options.baseUrl ?? ''}${config.path}`;
      const headers = new Headers({ ...options.defaultHeaders, ...config.headers });
      const signal =
        config.timeoutMs !== undefined
          ? createTimeoutSignal(config.timeoutMs, config.signal)
          : config.signal;

      const context: RequestContext = {
        url,
        method: config.method ?? 'GET',
        headers,
        body:
          config.body === undefined || config.body === null
            ? undefined
            : typeof config.body === 'string'
              ? config.body
              : JSON.stringify(config.body),
        signal,
        timeoutMs: config.timeoutMs,
      };

      if (context.body !== undefined && !headers.has('Content-Type')) {
        headers.set('Content-Type', 'application/json');
      }

      const execute = composeMiddleware(options.middleware ?? [], (ctx) =>
        fetchFn(ctx.url, {
          method: ctx.method,
          headers: ctx.headers,
          body: ctx.body,
          signal: ctx.signal,
        }),
      );

      try {
        const response = await execute(context);

        if (!response.ok) {
          throw new ApiError(`Request failed: ${response.statusText}`, response.status);
        }

        if (response.status === 204) {
          return undefined as TResponse;
        }

        return (await response.json()) as TResponse;
      } catch (error) {
        const normalized = normalizeError(error);
        options.logger?.error('API request failed', normalized, { url, method: context.method });
        throw normalized;
      }
    },
  };
}
