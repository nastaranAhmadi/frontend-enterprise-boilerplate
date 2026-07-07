export type ErrorCode = string;

export type ErrorMetadata = Record<string, unknown>;

export class ApiError extends Error {
  override readonly name = 'ApiError';

  constructor(
    message: string,
    readonly status: number,
    readonly code: ErrorCode = 'API_ERROR',
    readonly metadata?: ErrorMetadata,
  ) {
    super(message);
  }
}

export class ValidationError extends Error {
  override readonly name = 'ValidationError';

  constructor(
    message: string,
    readonly fieldErrors: Record<string, string[]> = {},
    readonly metadata?: ErrorMetadata,
  ) {
    super(message);
  }
}

export class UnknownError extends Error {
  override readonly name = 'UnknownError';

  constructor(
    message = 'An unknown error occurred',
    override readonly cause?: unknown,
    readonly metadata?: ErrorMetadata,
  ) {
    super(message);
  }
}

export type NormalizedError = ApiError | ValidationError | UnknownError;

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

export function isValidationError(error: unknown): error is ValidationError {
  return error instanceof ValidationError;
}

export function isUnknownError(error: unknown): error is UnknownError {
  return error instanceof UnknownError;
}

/** Normalizes unknown thrown values into typed application errors. */
export function normalizeError(error: unknown): NormalizedError {
  if (isApiError(error) || isValidationError(error) || isUnknownError(error)) {
    return error;
  }

  if (error instanceof Error) {
    return new UnknownError(error.message, error);
  }

  return new UnknownError('An unknown error occurred', error);
}
