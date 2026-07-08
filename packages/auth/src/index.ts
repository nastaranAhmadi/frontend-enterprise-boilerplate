import type { ApiClient } from '@enterprise/api-client';

export type AuthTokens = {
  accessToken: string;
  refreshToken?: string;
  expiresAt?: number;
};

export type TokenRefreshStrategy = (tokens: AuthTokens) => Promise<AuthTokens>;

export type AuthBoundaryOptions = {
  apiClient: ApiClient;
  getTokens: () => AuthTokens | null;
  setTokens: (tokens: AuthTokens | null) => void;
  refreshStrategy?: TokenRefreshStrategy;
};

export type AuthSession = {
  isAuthenticated: boolean;
  tokens: AuthTokens | null;
};

export interface AuthBoundary {
  getSession(): AuthSession;
  refreshTokens(): Promise<AuthTokens | null>;
  clearSession(): void;
}
