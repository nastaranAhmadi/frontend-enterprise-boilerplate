import { z } from 'zod';

export { z };
export type { ZodType } from 'zod';

export type InferSchema<T extends z.ZodType> = z.infer<T>;
export type SchemaRegistry = Record<string, z.ZodType>;
