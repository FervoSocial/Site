import { getD1 } from "@/db";
import { jsonError, jsonSuccess, readJsonObject } from "@/lib/auth/http";
import { completeSandboxVerification, startVerification } from "@/lib/auth/repository";
import { principalFromCookieHeader } from "@/lib/auth/session";

export async function POST(request: Request) {
  const principal = await principalFromCookieHeader(getD1(), request.headers.get("cookie"));
  if (!principal || principal.status === "suspended" || principal.status === "deleted") {
    return jsonError("authentication_required", 401);
  }
  if ((globalThis.__FERVO_ENV?.VERIFICATION_PROVIDER_MODE ?? "sandbox") !== "sandbox") {
    return jsonError("verification_provider_unavailable", 503);
  }

  const body = await readJsonObject(request) as Record<string, unknown> | null;
  const action = body?.action;
  if (action === "start" || action === "retry") {
    if (principal.verificationState === "approved") return jsonError("already_verified", 409);
    if (principal.verificationState === "pending") return jsonSuccess({ state: "pending" });
    if (action === "retry" && principal.verificationState !== "failed") {
      return jsonError("verification_retry_unavailable", 409);
    }
    await startVerification(getD1(), principal);
    return jsonSuccess({ state: "pending" });
  }
  if (action === "approve" || action === "fail") {
    if (principal.verificationState !== "pending") return jsonError("verification_not_pending", 409);
    const state = action === "approve" ? "approved" : "failed";
    await completeSandboxVerification(getD1(), principal, state);
    return jsonSuccess({ state, next: state === "approved" ? "/home" : "/verify-age" });
  }
  return jsonError("invalid_verification_action");
}
