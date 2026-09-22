import { getD1 } from "@/db";
import { jsonError, jsonSuccess, readJsonObject } from "@/lib/auth/http";
import { principalFromCookieHeader } from "@/lib/auth/session";
import {
  canPublishFromPersonalProfile,
  createPublicPost,
  validateCreatePostInput,
} from "@/lib/posts";

export async function POST(request: Request) {
  const db = getD1();
  const principal = await principalFromCookieHeader(db, request.headers.get("cookie"));
  if (!principal) return jsonError("authentication_required", 401);
  if (principal.status !== "active" || principal.verificationState !== "approved") {
    return jsonError("verified_member_required", 403);
  }
  if (!canPublishFromPersonalProfile(principal)) {
    return jsonError("private_member_required", 403);
  }

  const parsed = validateCreatePostInput(await readJsonObject(request));
  if (!parsed.ok) return jsonError(parsed.code);

  try {
    const post = await createPublicPost(db, principal, parsed.body);
    return jsonSuccess({ post }, { status: 201 });
  } catch {
    return jsonError("post_create_failed", 500);
  }
}
