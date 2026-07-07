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

/** Secure authentication boundary — token storage and refresh contracts only. */
export function createAuthBoundary(options: AuthBoundaryOptions) {
  return {
    getSession(): AuthSession {
      const tokens = options.getTokens();
      return { isAuthenticated: tokens !== null, tokens };
    },
    async refreshTokens(): Promise<AuthTokens | null> {
      const current = options.getTokens();
      if (!current || !options.refreshStrategy) return current;
      const refreshed = await options.refreshStrategy(current);
      options.setTokens(refreshed);
      return refreshed;
    },
    clearSession(): void {
      options.setTokens(null);
    },
  };
}

export type AuthBoundary = ReturnType<typeof createAuthBoundary>;
