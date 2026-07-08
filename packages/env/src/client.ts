import type { ZodType } from '@enterprise/validation';

export type ClientEnvParser = <TSchema extends ZodType>(
  schema: TSchema,
  values: Record<string, string | undefined>,
) => TSchema['_output'];
