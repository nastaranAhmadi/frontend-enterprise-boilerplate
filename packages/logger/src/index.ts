import { type normalizeError } from '@enterprise/errors';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export type LogContext = Record<string, unknown>;

export type LogEntry = {
  level: LogLevel;
  message: string;
  context?: LogContext;
  error?: ReturnType<typeof normalizeError>;
  timestamp: string;
};

/** Provider contract for Sentry, LogRocket, Datadog, Console, etc. */
export interface LogProvider {
  readonly name: string;
  log(entry: LogEntry): void | Promise<void>;
}

export interface Logger {
  debug(message: string, context?: LogContext): void;
  info(message: string, context?: LogContext): void;
  warn(message: string, context?: LogContext): void;
  error(message: string, error?: unknown, context?: LogContext): void;
}

export type LoggerOptions = {
  providers?: LogProvider[];
  defaultContext?: LogContext;
};

export interface LoggerFactory {
  create(options?: LoggerOptions): Logger;
}
