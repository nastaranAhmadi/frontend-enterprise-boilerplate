import { createEnv } from './index.js';

/** Server-only environment entry point. Must never be imported in client bundles. */
export function createServerEnv<TSchema extends Parameters<typeof createEnv>[0]['schema']>(
  schema: TSchema,
  values: Record<string, string | undefined>,
) {
  return createEnv({ schema, values, runtime: 'server' });
}
