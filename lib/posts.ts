import type { SessionPrincipal } from "@/lib/auth/types";
import type { ValidatedPostMedia } from "@/lib/post-media";
import { POST_MEDIA_ATTESTATION_VERSION } from "@/lib/post-media";

export const POST_BODY_MAX_CHARACTERS = 1000;
export const POST_AUDIENCES = ["public", "profile", "only_me"] as const;
export type PostAudience = (typeof POST_AUDIENCES)[number];

export type PublicPost = {
  audience: PostAudience;
  authorProfileId: string;
  body: string;
  createdAt: number;
  displayName: string;
  handle: string;
  id: string;
  approximateLocationLabel: string | null;
  media: null | {
    kind: "image" | "video";
    mimeType: string;
  };
};

type PublicPostRow = {
  approximate_location_label: string | null;
  audience: PostAudience;
  author_profile_id: string;
  body: string;
  created_at: number;
  display_name: string;
  handle: string;
  id: string;
  media_type: "image" | "video" | null;
  mime_type: string | null;
};

export type CreatePostValidation =
  | { ok: true; body: string; audience: PostAudience }
  | { ok: false; code: "invalid_post" | "post_empty" | "post_too_long" | "unsupported_audience" };

export function countPostCharacters(value: string) {
  return Array.from(value).length;
}

export function validateCreatePostInput(input: unknown): CreatePostValidation {
  if (!input || typeof input !== "object") return { ok: false, code: "invalid_post" };
  const value = input as Record<string, unknown>;
  if (typeof value.audience !== "string" || !POST_AUDIENCES.includes(value.audience as PostAudience)) {
    return { ok: false, code: "unsupported_audience" };
  }
  if (typeof value.body !== "string") return { ok: false, code: "invalid_post" };
  const body = value.body.trim();
  if (!body) return { ok: false, code: "post_empty" };
  if (countPostCharacters(body) > POST_BODY_MAX_CHARACTERS) {
    return { ok: false, code: "post_too_long" };
  }
  return { ok: true, body, audience: value.audience as PostAudience };
}

export function canPublishFromPersonalProfile(principal: SessionPrincipal) {
  return (
    principal.status === "active" &&
    principal.verificationState === "approved" &&
    principal.accountType === "private"
  );
}

export async function createPost(
  db: D1Database,
  principal: SessionPrincipal,
  body: string,
  audience: PostAudience,
) {
  const id = crypto.randomUUID();
  const now = Math.floor(Date.now() / 1000);
  const result = await db.prepare(`
    INSERT INTO posts (id, author_profile_id, body, audience, created_at, updated_at)
    SELECT ?, p.id, ?, ?, ?, ?
    FROM profiles p
    JOIN account_types at ON at.id = p.account_type_id
    WHERE p.id = ? AND p.owner_user_id = ? AND at.code = 'private'
  `).bind(id, body, audience, now, now, principal.profileId, principal.userId).run();

  if ((result.meta?.changes ?? 0) !== 1) throw new Error("post_author_profile_unavailable");
  return { id, createdAt: now };
}

export async function createPostWithMedia(
  db: D1Database,
  bucket: R2Bucket,
  principal: SessionPrincipal,
  body: string,
  audience: PostAudience,
  media: ValidatedPostMedia,
) {
  const postId = crypto.randomUUID();
  const mediaId = crypto.randomUUID();
  const now = Math.floor(Date.now() / 1000);
  const objectKey = `posts/${principal.profileId}/${postId}/${mediaId}.${media.extension}`;

  await bucket.put(objectKey, media.bytes, {
    httpMetadata: { contentType: media.mimeType },
  });

  try {
    const results = await db.batch([
      db.prepare(`
        INSERT INTO posts (id, author_profile_id, body, audience, created_at, updated_at)
        SELECT ?, p.id, ?, ?, ?, ?
        FROM profiles p
        JOIN account_types at ON at.id = p.account_type_id
        WHERE p.id = ? AND p.owner_user_id = ? AND at.code = 'private'
      `).bind(postId, body, audience, now, now, principal.profileId, principal.userId),
      db.prepare(`
        INSERT INTO post_media (
          id, post_id, owner_profile_id, object_key, media_type, mime_type,
          byte_size, attestation_version, attested_at, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(
        mediaId,
        postId,
        principal.profileId,
        objectKey,
        media.kind,
        media.mimeType,
        media.byteSize,
        POST_MEDIA_ATTESTATION_VERSION,
        now,
        now,
      ),
    ]);
    if ((results[0]?.meta?.changes ?? 0) !== 1 || (results[1]?.meta?.changes ?? 0) !== 1) {
      throw new Error("post_media_create_failed");
    }
  } catch (error) {
    await bucket.delete(objectKey);
    throw error;
  }

  return { id: postId, createdAt: now };
}

export async function listPublicPosts(db: D1Database): Promise<PublicPost[]> {
  const result = await db.prepare(`
    SELECT
      post.id,
      post.author_profile_id,
      post.body,
      post.audience,
      post.created_at,
      profile.handle,
      profile.display_name,
      profile.approximate_location_label
      , media.media_type
      , media.mime_type
    FROM posts post
    JOIN profiles profile ON profile.id = post.author_profile_id
    JOIN account_types account_type ON account_type.id = profile.account_type_id
    JOIN users owner ON owner.id = profile.owner_user_id
    LEFT JOIN post_media media ON media.post_id = post.id AND media.deleted_at IS NULL
    WHERE
      post.audience = 'public'
      AND post.deleted_at IS NULL
      AND account_type.code = 'private'
      AND owner.status = 'active'
      AND owner.deleted_at IS NULL
    ORDER BY post.created_at DESC, post.id DESC
    LIMIT 50
  `).all<PublicPostRow>();

  return (result.results ?? []).map((row) => ({
    id: row.id,
    authorProfileId: row.author_profile_id,
    body: row.body,
    audience: row.audience,
    createdAt: row.created_at,
    handle: row.handle,
    displayName: row.display_name,
    approximateLocationLabel: row.approximate_location_label,
    media: row.media_type && row.mime_type
      ? { kind: row.media_type, mimeType: row.mime_type }
      : null,
  }));
}

export async function listProfilePosts(
  db: D1Database,
  profileId: string,
  ownerView = false,
): Promise<PublicPost[]> {
  const result = await db.prepare(`
    SELECT
      post.id,
      post.author_profile_id,
      post.body,
      post.audience,
      post.created_at,
      profile.handle,
      profile.display_name,
      profile.approximate_location_label,
      media.media_type,
      media.mime_type
    FROM posts post
    JOIN profiles profile ON profile.id = post.author_profile_id
    JOIN account_types account_type ON account_type.id = profile.account_type_id
    JOIN users owner ON owner.id = profile.owner_user_id
    LEFT JOIN post_media media ON media.post_id = post.id AND media.deleted_at IS NULL
    WHERE
      post.author_profile_id = ?
      AND post.audience IN (${ownerView ? "'public', 'profile', 'only_me'" : "'public', 'profile'"})
      AND post.deleted_at IS NULL
      AND account_type.code = 'private'
      AND owner.status = 'active'
      AND owner.deleted_at IS NULL
    ORDER BY post.created_at DESC, post.id DESC
    LIMIT 30
  `).bind(profileId).all<PublicPostRow>();

  return (result.results ?? []).map(mapPostRow);
}

function mapPostRow(row: PublicPostRow): PublicPost {
  return {
    id: row.id,
    authorProfileId: row.author_profile_id,
    body: row.body,
    audience: row.audience,
    createdAt: row.created_at,
    handle: row.handle,
    displayName: row.display_name,
    approximateLocationLabel: row.approximate_location_label,
    media: row.media_type && row.mime_type
      ? { kind: row.media_type, mimeType: row.mime_type }
      : null,
  };
}

export async function findVisiblePostMedia(
  db: D1Database,
  postId: string,
  viewerProfileId: string,
) {
  return db.prepare(`
    SELECT media.object_key, media.mime_type, media.byte_size
    FROM post_media media
    JOIN posts post ON post.id = media.post_id
    JOIN profiles profile ON profile.id = post.author_profile_id
    JOIN users owner ON owner.id = profile.owner_user_id
    LEFT JOIN privacy_settings privacy ON privacy.user_id = profile.owner_user_id
    WHERE
      post.id = ?
      AND (
        post.audience = 'public'
        OR (
          post.audience = 'profile'
          AND (post.author_profile_id = ? OR COALESCE(privacy.profile_discoverability, 'members') <> 'hidden')
        )
        OR (post.audience = 'only_me' AND post.author_profile_id = ?)
      )
      AND post.deleted_at IS NULL
      AND media.deleted_at IS NULL
      AND owner.status = 'active'
      AND owner.deleted_at IS NULL
  `).bind(postId, viewerProfileId, viewerProfileId).first<{
    object_key: string;
    mime_type: string;
    byte_size: number;
  }>();
}

export async function softDeletePostForAuthor(
  db: D1Database,
  postId: string,
  authorProfileId: string,
) {
  const now = Math.floor(Date.now() / 1000);
  const media = await db.prepare(`
    SELECT media.object_key
    FROM posts post
    LEFT JOIN post_media media ON media.post_id = post.id AND media.deleted_at IS NULL
    WHERE post.id = ? AND post.author_profile_id = ? AND post.deleted_at IS NULL
  `).bind(postId, authorProfileId).first<{ object_key: string | null }>();
  if (!media) return { deleted: false, objectKey: null };

  const result = await db.prepare(`
    UPDATE posts
    SET deleted_at = ?, updated_at = ?
    WHERE id = ? AND author_profile_id = ? AND deleted_at IS NULL
  `).bind(now, now, postId, authorProfileId).run();
  const deleted = (result.meta?.changes ?? 0) === 1;
  if (deleted && media.object_key) {
    await db.prepare(`
      UPDATE post_media SET deleted_at = ? WHERE post_id = ? AND deleted_at IS NULL
    `).bind(now, postId).run();
  }
  return { deleted, objectKey: deleted ? media.object_key : null };
}
