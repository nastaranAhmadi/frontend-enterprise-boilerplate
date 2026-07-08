export type RuntimeEnvironment = 'development' | 'test' | 'staging' | 'production';

export interface RuntimeConfig {
  environment: RuntimeEnvironment;
  appName: string;
  appVersion: string;
}

export interface ConfigProvider<TConfig extends Record<string, unknown>> {
  readonly namespace: string;
  get(): TConfig;
}
