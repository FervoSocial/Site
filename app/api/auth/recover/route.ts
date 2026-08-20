import { getD1 } from "@/db";
import { createOpaqueToken, hashOpaqueToken } from "@/lib/auth/crypto";
import { jsonError, jsonSuccess, readJsonObject } from "@/lib/auth/http";
import { createRecoveryRequest } from "@/lib/auth/repository";
import { normalizeEmail } from "@/lib/auth/validation";

export async function POST(request: Request) {
  const body = await readJsonObject(request) as Record<string, unknown> | null;
  const email = typeof body?.email === "string" ? normalizeEmail(body.email) : "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return jsonError("invalid_email");

  const token = createOpaqueToken();
  await createRecoveryRequest(getD1(), email, await hashOpaqueToken(token));

  // Always return the same response so this endpoint cannot reveal account membership.
  return jsonSuccess({ requested: true });
}
