import { getD1 } from "@/db";
import { jsonError, jsonSuccess } from "@/lib/auth/http";
import { principalFromCookieHeader } from "@/lib/auth/session";
import { canPublishFromPersonalProfile, softDeletePostForAuthor } from "@/lib/posts";

export async function DELETE(
  request: Request,
  context: { params: Promise<{ postId: string }> },
) {
  const db = getD1();
  const principal = await principalFromCookieHeader(db, request.headers.get("cookie"));
  if (!principal) return jsonError("authentication_required", 401);
  if (principal.status !== "active" || principal.verificationState !== "approved") {
    return jsonError("verified_member_required", 403);
  }
  if (!canPublishFromPersonalProfile(principal)) {
    return jsonError("private_member_required", 403);
  }

  const { postId } = await context.params;
  if (!postId) return jsonError("post_not_found", 404);
  const deleted = await softDeletePostForAuthor(db, postId, principal.profileId);
  if (!deleted) return jsonError("post_not_found", 404);
  return jsonSuccess({ deleted: true });
}
