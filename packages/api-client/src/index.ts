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

export type RetryStrategy = {
  maxRetries: number;
  backoffMs: number;
};

export type AuthMiddlewareConfig = {
  getAccessToken: () => string | undefined;
  refreshToken?: () => Promise<string | undefined>;
};

export { createApiClient } from './create-api-client';
