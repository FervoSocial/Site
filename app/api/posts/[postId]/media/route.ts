import { getD1, getMediaBucket } from "@/db";
import { jsonError } from "@/lib/auth/http";
import { principalFromCookieHeader } from "@/lib/auth/session";
import { findPublicPostMedia } from "@/lib/posts";

export async function GET(
  request: Request,
  context: { params: Promise<{ postId: string }> },
) {
  const db = getD1();
  const principal = await principalFromCookieHeader(db, request.headers.get("cookie"));
  if (!principal) return jsonError("authentication_required", 401);
  if (principal.status !== "active" || principal.verificationState !== "approved") {
    return jsonError("verified_member_required", 403);
  }

  const { postId } = await context.params;
  const media = await findPublicPostMedia(db, postId);
  if (!media) return jsonError("media_not_found", 404);
  const object = await getMediaBucket().get(media.object_key);
  if (!object) return jsonError("media_not_found", 404);

  return new Response(object.body, {
    headers: {
      "Cache-Control": "private, max-age=300",
      "Content-Length": String(media.byte_size),
      "Content-Type": media.mime_type,
      "Content-Disposition": "inline",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
