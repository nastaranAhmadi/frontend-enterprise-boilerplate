import { z } from 'zod';

export { z };
export type { ZodType } from 'zod';

export type InferSchema<T extends z.ZodType> = z.infer<T>;

/** Infrastructure placeholder — domain schemas will be added in later sections. */
export const PACKAGE_NAME = '@enterprise/validation' as const;

export function createSchema<T extends z.ZodType>(schema: T): T {
  return schema;
}
