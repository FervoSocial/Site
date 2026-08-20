import { getD1 } from "@/db";
import { hashPassword } from "@/lib/auth/crypto";
import { jsonError, jsonSuccess, readJsonObject } from "@/lib/auth/http";
import { createRegistration, emailExists, handleExists } from "@/lib/auth/repository";
import { issueSession } from "@/lib/auth/session";
import { normalizeHandle, parseRegistrationInput } from "@/lib/auth/validation";

export async function POST(request: Request) {
  const parsed = parseRegistrationInput(await readJsonObject(request));
  if (!parsed.ok) return jsonError(parsed.code);

  const db = getD1();
  const handle = normalizeHandle(parsed.value.username);
  if (await emailExists(db, parsed.value.email)) return jsonError("account_unavailable", 409);
  if (await handleExists(db, handle)) return jsonError("handle_unavailable", 409);

  try {
    const { userId } = await createRegistration(db, {
      accountType: parsed.value.accountType,
      email: parsed.value.email,
      handle,
      passwordHash: await hashPassword(parsed.value.password),
      publicDisplayName: parsed.value.username,
    });
    const session = await issueSession(db, userId, request.url);
    return jsonSuccess(
      { next: "/verify-age" },
      { status: 201, headers: { "Set-Cookie": session.cookie } },
    );
  } catch {
    return jsonError("registration_unavailable", 503);
  }
}
