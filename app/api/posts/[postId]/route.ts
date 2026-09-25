import { getD1, getMediaBucket } from "@/db";
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
  const result = await softDeletePostForAuthor(db, postId, principal.profileId);
  if (!result.deleted) return jsonError("post_not_found", 404);
  if (result.objectKey) await getMediaBucket().delete(result.objectKey);
  return jsonSuccess({ deleted: true });
}
