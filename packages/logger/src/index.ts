import { normalizeError } from '@enterprise/errors';

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

function createConsoleProvider(): LogProvider {
  return {
    name: 'console',
    log(entry) {
      const payload = entry.context ? [entry.message, entry.context] : [entry.message];
      switch (entry.level) {
        case 'debug':
          console.debug(...payload); // eslint-disable-line no-console -- console provider
          break;
        case 'info':
          console.info(...payload); // eslint-disable-line no-console -- console provider
          break;
        case 'warn':
          console.warn(...payload);
          break;
        case 'error':
          console.error(...payload, entry.error);
          break;
      }
    },
  };
}

/** Creates a logger that fans out to configured providers. */
export function createLogger(options: LoggerOptions = {}): Logger {
  const providers = options.providers ?? [createConsoleProvider()];
  const defaultContext = options.defaultContext ?? {};

  const write = (level: LogLevel, message: string, context?: LogContext, error?: unknown) => {
    const entry: LogEntry = {
      level,
      message,
      context: { ...defaultContext, ...context },
      error: error === undefined ? undefined : normalizeError(error),
      timestamp: new Date().toISOString(),
    };

    for (const provider of providers) {
      void provider.log(entry);
    }
  };

  return {
    debug: (message, context) => {
      write('debug', message, context);
    },
    info: (message, context) => {
      write('info', message, context);
    },
    warn: (message, context) => {
      write('warn', message, context);
    },
    error: (message, error, context) => {
      write('error', message, context, error);
    },
  };
}
