import { getD1, getMediaBucket } from "@/db";
import { jsonError, jsonSuccess, readJsonObject } from "@/lib/auth/http";
import { principalFromCookieHeader } from "@/lib/auth/session";
import { validatePostMediaFile } from "@/lib/post-media";
import {
  canPublishFromPersonalProfile,
  createPost,
  createPostWithMedia,
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

  const contentType = request.headers.get("content-type")?.toLowerCase() ?? "";
  if (contentType.includes("multipart/form-data")) {
    let form: FormData;
    try {
      form = await request.formData();
    } catch {
      return jsonError("invalid_post");
    }
    const parsed = validateCreatePostInput({
      audience: form.get("audience"),
      body: form.get("body"),
    });
    if (!parsed.ok) return jsonError(parsed.code);
    const file = form.get("media");
    if (!(file instanceof File)) return jsonError("media_required");
    if (form.get("mediaAttestation") !== "accepted") {
      return jsonError("media_attestation_required");
    }
    const validatedMedia = await validatePostMediaFile(file);
    if (!validatedMedia.ok) return jsonError(validatedMedia.code);

    try {
      const post = await createPostWithMedia(
        db,
        getMediaBucket(),
        principal,
        parsed.body,
        parsed.audience,
        validatedMedia.media,
      );
      return jsonSuccess({ post }, { status: 201 });
    } catch {
      return jsonError("post_create_failed", 500);
    }
  }

  const parsed = validateCreatePostInput(await readJsonObject(request));
  if (!parsed.ok) return jsonError(parsed.code);

  try {
    const post = await createPost(db, principal, parsed.body, parsed.audience);
    return jsonSuccess({ post }, { status: 201 });
  } catch {
    return jsonError("post_create_failed", 500);
  }
}
