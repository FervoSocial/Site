interface D1Result<T = unknown> {
  success: boolean;
  results?: T[];
  meta?: { changes?: number; last_row_id?: number };
}

interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  first<T = Record<string, unknown>>(columnName?: string): Promise<T | null>;
  all<T = Record<string, unknown>>(): Promise<D1Result<T>>;
  run<T = Record<string, unknown>>(): Promise<D1Result<T>>;
}

interface D1Database {
  prepare(query: string): D1PreparedStatement;
  batch<T = unknown>(statements: D1PreparedStatement[]): Promise<D1Result<T>[]>;
}

interface Fetcher {
  fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
}

// `var` is required for a global environment binding declaration.
// eslint-disable-next-line no-var
declare var __FERVO_ENV: {
  DB?: D1Database;
  VERIFICATION_PROVIDER_MODE?: string;
} | undefined;

interface GlobalThis {
  __FERVO_ENV?: {
    DB?: D1Database;
    VERIFICATION_PROVIDER_MODE?: string;
  };
}
