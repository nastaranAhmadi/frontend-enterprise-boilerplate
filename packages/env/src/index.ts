import type { ZodType } from '@enterprise/validation';
import { z } from '@enterprise/validation';

export type EnvRuntime = 'client' | 'server';

export type CreateEnvOptions<TSchema extends ZodType> = {
  schema: TSchema;
  values: Record<string, string | undefined>;
  runtime: EnvRuntime;
};

export type EnvParser = <TSchema extends ZodType>(
  options: CreateEnvOptions<TSchema>,
) => z.infer<TSchema>;

export { z };
