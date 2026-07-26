import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

export function getD1(): D1Database {
  if (!globalThis.__FERVO_ENV?.DB) {
    throw new Error(
      "Cloudflare D1 binding `DB` is unavailable. Set the `d1` field in .openai/hosting.json to `DB` before using identity persistence."
    );
  }
  return globalThis.__FERVO_ENV.DB;
}

export function getDb() {
  return drizzle(getD1(), { schema });
}
