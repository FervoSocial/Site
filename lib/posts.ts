import type { SessionPrincipal } from "@/lib/auth/types";

export const POST_BODY_MAX_CHARACTERS = 1000;
export const SUPPORTED_POST_AUDIENCE = "public" as const;

export type PublicPost = {
  audience: typeof SUPPORTED_POST_AUDIENCE;
  authorProfileId: string;
  body: string;
  createdAt: number;
  displayName: string;
  handle: string;
  id: string;
  approximateLocationLabel: string | null;
};

type PublicPostRow = {
  approximate_location_label: string | null;
  audience: typeof SUPPORTED_POST_AUDIENCE;
  author_profile_id: string;
  body: string;
  created_at: number;
  display_name: string;
  handle: string;
  id: string;
};

export type CreatePostValidation =
  | { ok: true; body: string; audience: typeof SUPPORTED_POST_AUDIENCE }
  | { ok: false; code: "invalid_post" | "post_empty" | "post_too_long" | "unsupported_audience" };

export function countPostCharacters(value: string) {
  return Array.from(value).length;
}

export function validateCreatePostInput(input: unknown): CreatePostValidation {
  if (!input || typeof input !== "object") return { ok: false, code: "invalid_post" };
  const value = input as Record<string, unknown>;
  if (value.audience !== SUPPORTED_POST_AUDIENCE) {
    return { ok: false, code: "unsupported_audience" };
  }
  if (typeof value.body !== "string") return { ok: false, code: "invalid_post" };
  const body = value.body.trim();
  if (!body) return { ok: false, code: "post_empty" };
  if (countPostCharacters(body) > POST_BODY_MAX_CHARACTERS) {
    return { ok: false, code: "post_too_long" };
  }
  return { ok: true, body, audience: SUPPORTED_POST_AUDIENCE };
}

export function canPublishFromPersonalProfile(principal: SessionPrincipal) {
  return (
    principal.status === "active" &&
    principal.verificationState === "approved" &&
    principal.accountType === "private"
  );
}

export async function createPublicPost(
  db: D1Database,
  principal: SessionPrincipal,
  body: string,
) {
  const id = crypto.randomUUID();
  const now = Math.floor(Date.now() / 1000);
  const result = await db.prepare(`
    INSERT INTO posts (id, author_profile_id, body, audience, created_at, updated_at)
    SELECT ?, p.id, ?, 'public', ?, ?
    FROM profiles p
    JOIN account_types at ON at.id = p.account_type_id
    WHERE p.id = ? AND p.owner_user_id = ? AND at.code = 'private'
  `).bind(id, body, now, now, principal.profileId, principal.userId).run();

  if ((result.meta?.changes ?? 0) !== 1) throw new Error("post_author_profile_unavailable");
  return { id, createdAt: now };
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
    FROM posts post
    JOIN profiles profile ON profile.id = post.author_profile_id
    JOIN account_types account_type ON account_type.id = profile.account_type_id
    JOIN users owner ON owner.id = profile.owner_user_id
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
  }));
}

export async function listPublicPostsForProfile(db: D1Database, profileId: string): Promise<PublicPost[]> {
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
    FROM posts post
    JOIN profiles profile ON profile.id = post.author_profile_id
    JOIN account_types account_type ON account_type.id = profile.account_type_id
    JOIN users owner ON owner.id = profile.owner_user_id
    WHERE
      post.author_profile_id = ?
      AND post.audience = 'public'
      AND post.deleted_at IS NULL
      AND account_type.code = 'private'
      AND owner.status = 'active'
      AND owner.deleted_at IS NULL
    ORDER BY post.created_at DESC, post.id DESC
    LIMIT 30
  `).bind(profileId).all<PublicPostRow>();

  return (result.results ?? []).map((row) => ({
    id: row.id,
    authorProfileId: row.author_profile_id,
    body: row.body,
    audience: row.audience,
    createdAt: row.created_at,
    handle: row.handle,
    displayName: row.display_name,
    approximateLocationLabel: row.approximate_location_label,
  }));
}

export async function softDeletePostForAuthor(
  db: D1Database,
  postId: string,
  authorProfileId: string,
) {
  const now = Math.floor(Date.now() / 1000);
  const result = await db.prepare(`
    UPDATE posts
    SET deleted_at = ?, updated_at = ?
    WHERE id = ? AND author_profile_id = ? AND deleted_at IS NULL
  `).bind(now, now, postId, authorProfileId).run();
  return (result.meta?.changes ?? 0) === 1;
}
