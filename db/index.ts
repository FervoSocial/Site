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

export function getMediaBucket(): R2Bucket {
  if (!globalThis.__FERVO_ENV?.MEDIA) {
    throw new Error(
      "Cloudflare R2 binding `MEDIA` is unavailable. Set the `r2` field in .openai/hosting.json to `MEDIA` before using post media storage."
    );
  }
  return globalThis.__FERVO_ENV.MEDIA;
}
