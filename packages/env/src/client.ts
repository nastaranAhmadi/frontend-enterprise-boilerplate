import { createEnv } from './index.js';

/** Client-safe environment entry point (VITE_*, NEXT_PUBLIC_* prefixes enforced at schema level). */
export function createClientEnv<TSchema extends Parameters<typeof createEnv>[0]['schema']>(
  schema: TSchema,
  values: Record<string, string | undefined>,
) {
  return createEnv({ schema, values, runtime: 'client' });
}
