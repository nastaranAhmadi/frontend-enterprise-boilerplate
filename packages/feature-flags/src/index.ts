import type { Logger } from '@enterprise/logger';

export type FeatureFlagKey = string;

export type FeatureFlagValue = boolean | string | number;

export type FeatureFlagsMap = Record<FeatureFlagKey, FeatureFlagValue>;

export interface FeatureFlagProvider {
  readonly name: string;
  resolve(
    key: FeatureFlagKey,
  ): Promise<FeatureFlagValue | undefined> | FeatureFlagValue | undefined;
}

export type FeatureFlagsClientOptions = {
  providers?: FeatureFlagProvider[];
  defaults?: FeatureFlagsMap;
  logger?: Logger;
};

export interface FeatureFlagsClient {
  isEnabled(key: FeatureFlagKey): boolean;
  getValue(key: FeatureFlagKey): FeatureFlagValue | undefined;
}

export interface FeatureFlagsClientFactory {
  create(options?: FeatureFlagsClientOptions): FeatureFlagsClient;
}
