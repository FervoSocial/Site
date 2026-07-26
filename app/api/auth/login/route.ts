import { getD1 } from "@/db";
import { verifyPassword } from "@/lib/auth/crypto";
import { jsonError, jsonSuccess, readJsonObject } from "@/lib/auth/http";
import { findLoginRecord, recordLogin } from "@/lib/auth/repository";
import { issueSession } from "@/lib/auth/session";
import { normalizeEmail } from "@/lib/auth/validation";

export async function POST(request: Request) {
  const body = await readJsonObject(request) as Record<string, unknown> | null;
  const email = typeof body?.email === "string" ? normalizeEmail(body.email) : "";
  const password = typeof body?.password === "string" ? body.password : "";
  if (!email || !password) return jsonError("invalid_credentials", 401);

  const db = getD1();
  const identity = await findLoginRecord(db, email);
  if (!identity || !(await verifyPassword(password, identity.passwordHash))) {
    if (identity) await recordLogin(db, identity.userId, identity.identityId, "rejected");
    return jsonError("invalid_credentials", 401);
  }
  if (identity.status === "suspended" || identity.status === "deleted") {
    await recordLogin(db, identity.userId, identity.identityId, "rejected");
    return jsonError("account_unavailable", 403);
  }

  await recordLogin(db, identity.userId, identity.identityId, "success");
  const session = await issueSession(db, identity.userId, request.url);
  return jsonSuccess(
    { next: identity.status === "active" ? "/home" : "/verify-age" },
    { headers: { "Set-Cookie": session.cookie } },
  );
}
