export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends Record<string, unknown> ? DeepPartial<T[K]> : T[K];
};

export type ValueOf<T> = T[keyof T];

export type Primitive = string | number | boolean | bigint | symbol | null | undefined;
