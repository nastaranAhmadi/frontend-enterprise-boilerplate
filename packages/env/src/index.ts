import { ValidationError } from '@enterprise/errors';
import type { ZodType } from '@enterprise/validation';
import { z } from '@enterprise/validation';

export type EnvRuntime = 'client' | 'server';

export type CreateEnvOptions<TSchema extends ZodType> = {
  schema: TSchema;
  values: Record<string, string | undefined>;
  runtime: EnvRuntime;
};

/** Fail-fast environment parser with Zod validation. */
export function createEnv<TSchema extends ZodType>(
  options: CreateEnvOptions<TSchema>,
): z.infer<TSchema> {
  const result = options.schema.safeParse(options.values);

  if (!result.success) {
    const fieldErrors: Record<string, string[]> = {};
    for (const issue of result.error.issues) {
      const path = issue.path.join('.') || 'root';
      fieldErrors[path] = [...(fieldErrors[path] ?? []), issue.message];
    }
    throw new ValidationError(`Invalid ${options.runtime} environment configuration`, fieldErrors, {
      runtime: options.runtime,
    });
  }

  return result.data;
}

export { z };
