import type { ZodType } from '@enterprise/validation';

export type ServerEnvParser = <TSchema extends ZodType>(
  schema: TSchema,
  values: Record<string, string | undefined>,
) => TSchema['_output'];
