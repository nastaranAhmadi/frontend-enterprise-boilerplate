export type SharedModuleName = string;

export interface SharedModuleDefinition {
  readonly name: SharedModuleName;
  readonly version: string;
  readonly description?: string;
}

export interface SharedModuleRegistry {
  list(): readonly SharedModuleDefinition[];
}
