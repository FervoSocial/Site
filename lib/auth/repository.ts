import { privacyPolicy } from "@/lib/privacy/policy";
import { hashOpaqueToken } from "./crypto";
import type { AccountType, SessionPrincipal, UserRole, UserStatus, VerificationState } from "./types";

const accountTypeIds: Record<AccountType, string> = {
  private: "account-type-private",
  club_business: "account-type-club-business",
  event_organizer: "account-type-event-organizer",
  professional: "account-type-professional",
};

const verificationStateIds: Record<VerificationState, string> = {
  required: "verification-required",
  pending: "verification-pending",
  approved: "verification-approved",
  failed: "verification-failed",
};

export type RegistrationRecord = {
  accountType: AccountType;
  email: string;
  handle: string;
  passwordHash: string;
  publicDisplayName: string;
};

export type LoginRecord = {
  identityId: string;
  passwordHash: string;
  role: UserRole;
  status: UserStatus;
  userId: string;
};

type LoginRow = {
  identity_id: string;
  password_hash: string;
  role: UserRole;
  status: UserStatus;
  user_id: string;
};

type PrincipalRow = {
  account_type: AccountType;
  approximate_location_label: string | null;
  display_name: string;
  email: string;
  handle: string;
  location_visibility: "hidden" | "city" | "state";
  profile_id: string;
  role: UserRole;
  session_id: string;
  status: UserStatus;
  user_id: string;
  verification_state: VerificationState | null;
};

function nowSeconds() {
  return Math.floor(Date.now() / 1000);
}

export async function emailExists(db: D1Database, email: string) {
  return Boolean(await db.prepare("SELECT 1 AS present FROM auth_identities WHERE provider = 'password' AND identifier = ? LIMIT 1").bind(email).first());
}

export async function handleExists(db: D1Database, handle: string) {
  return Boolean(await db.prepare("SELECT 1 AS present FROM profiles WHERE handle = ? LIMIT 1").bind(handle).first());
}

export async function createRegistration(db: D1Database, input: RegistrationRecord) {
  const now = nowSeconds();
  const userId = crypto.randomUUID();
  const identityId = crypto.randomUUID();
  const profileId = crypto.randomUUID();
  const profileMemberId = crypto.randomUUID();
  const verificationId = crypto.randomUUID();
  const retentionReviewAt = now + privacyPolicy.retention.unverifiedAccountReviewDays * 24 * 60 * 60;
  const securityExpiry = now + privacyPolicy.retention.securityEventDays * 24 * 60 * 60;

  await db.batch([
    db.prepare("INSERT INTO users (id, role, status, locale, created_at, updated_at, retention_review_at) VALUES (?, 'member', 'pending_verification', 'pt-BR', ?, ?, ?)").bind(userId, now, now, retentionReviewAt),
    db.prepare("INSERT INTO auth_identities (id, user_id, provider, identifier, password_hash, created_at, updated_at) VALUES (?, ?, 'password', ?, ?, ?, ?)").bind(identityId, userId, input.email, input.passwordHash, now, now),
    db.prepare("INSERT INTO profiles (id, owner_user_id, account_type_id, handle, display_name, location_visibility, created_at, updated_at) VALUES (?, ?, ?, ?, ?, 'hidden', ?, ?)").bind(profileId, userId, accountTypeIds[input.accountType], input.handle, input.publicDisplayName, now, now),
    db.prepare("INSERT INTO profile_members (id, profile_id, user_id, public_display_name, member_role, verification_state_id, created_at, updated_at) VALUES (?, ?, ?, ?, 'owner', ?, ?, ?)").bind(profileMemberId, profileId, userId, input.publicDisplayName, verificationStateIds.required, now, now),
    db.prepare("INSERT INTO verifications (id, user_id, profile_member_id, state_id, provider, created_at, updated_at) VALUES (?, ?, ?, ?, 'sandbox', ?, ?)").bind(verificationId, userId, profileMemberId, verificationStateIds.required, now, now),
    db.prepare("INSERT INTO consent_records (id, user_id, consent_type, policy_version, source, accepted_at, created_at) VALUES (?, ?, 'adult_attestation', ?, 'web', ?, ?)").bind(crypto.randomUUID(), userId, privacyPolicy.policyVersions.adultAttestation, now, now),
    db.prepare("INSERT INTO consent_records (id, user_id, consent_type, policy_version, source, accepted_at, created_at) VALUES (?, ?, 'terms', ?, 'web', ?, ?)").bind(crypto.randomUUID(), userId, privacyPolicy.policyVersions.terms, now, now),
    db.prepare("INSERT INTO consent_records (id, user_id, consent_type, policy_version, source, accepted_at, created_at) VALUES (?, ?, 'privacy', ?, 'web', ?, ?)").bind(crypto.randomUUID(), userId, privacyPolicy.policyVersions.privacy, now, now),
    db.prepare("INSERT INTO privacy_settings (user_id, profile_discoverability, message_permission, show_online_status, distance_visibility, event_attendance_visibility, created_at, updated_at) VALUES (?, 'members', 'requests', 0, 'approximate', 'private', ?, ?)").bind(userId, now, now),
    db.prepare("INSERT INTO security_events (id, user_id, event_type, result, metadata_category, created_at, expires_at) VALUES (?, ?, 'registration', 'success', 'password', ?, ?)").bind(crypto.randomUUID(), userId, now, securityExpiry),
  ]);

  return { userId, profileId };
}

export async function findLoginRecord(db: D1Database, email: string) {
  return db.prepare(
    "SELECT ai.id AS identity_id, ai.password_hash, u.id AS user_id, u.role, u.status FROM auth_identities ai JOIN users u ON u.id = ai.user_id WHERE ai.provider = 'password' AND ai.identifier = ? AND u.deleted_at IS NULL LIMIT 1",
  ).bind(email).first<LoginRow>().then((row) => row ? {
    identityId: row.identity_id,
    passwordHash: row.password_hash,
    role: row.role,
    status: row.status,
    userId: row.user_id,
  } : null);
}

export async function recordLogin(db: D1Database, userId: string, identityId: string, result: "success" | "rejected") {
  const now = nowSeconds();
  const securityExpiry = now + privacyPolicy.retention.securityEventDays * 24 * 60 * 60;
  const statements = [
    db.prepare("INSERT INTO security_events (id, user_id, event_type, result, metadata_category, created_at, expires_at) VALUES (?, ?, 'login', ?, 'password', ?, ?)").bind(crypto.randomUUID(), userId, result, now, securityExpiry),
  ];
  if (result === "success") {
    statements.push(db.prepare("UPDATE users SET last_login_at = ?, updated_at = ? WHERE id = ?").bind(now, now, userId));
    statements.push(db.prepare("UPDATE auth_identities SET last_used_at = ?, updated_at = ? WHERE id = ?").bind(now, now, identityId));
  }
  await db.batch(statements);
}

export async function createSessionRecord(db: D1Database, userId: string, tokenHash: string) {
  const now = nowSeconds();
  const expiresAt = now + privacyPolicy.retention.sessionSeconds;
  const id = crypto.randomUUID();
  await db.prepare("INSERT INTO sessions (id, user_id, token_hash, created_at, last_seen_at, expires_at) VALUES (?, ?, ?, ?, ?, ?)")
    .bind(id, userId, tokenHash, now, now, expiresAt).run();
  return { id, expiresAt };
}

export async function findSessionPrincipal(db: D1Database, tokenHash: string): Promise<SessionPrincipal | null> {
  const row = await db.prepare(`
    SELECT
      s.id AS session_id,
      u.id AS user_id,
      u.role,
      u.status,
      ai.identifier AS email,
      p.id AS profile_id,
      p.handle,
      p.display_name,
      p.approximate_location_label,
      p.location_visibility,
      at.code AS account_type,
      COALESCE((
        SELECT vs.code
        FROM verifications v
        JOIN verification_states vs ON vs.id = v.state_id
        WHERE v.user_id = u.id
        ORDER BY v.created_at DESC, v.rowid DESC
        LIMIT 1
      ), 'required') AS verification_state
    FROM sessions s
    JOIN users u ON u.id = s.user_id
    JOIN auth_identities ai ON ai.user_id = u.id AND ai.provider = 'password'
    JOIN profiles p ON p.owner_user_id = u.id
    JOIN account_types at ON at.id = p.account_type_id
    WHERE s.token_hash = ? AND s.revoked_at IS NULL AND s.expires_at > ? AND u.deleted_at IS NULL
    LIMIT 1
  `).bind(tokenHash, nowSeconds()).first<PrincipalRow>();

  if (!row) return null;
  return {
    sessionId: row.session_id,
    userId: row.user_id,
    role: row.role,
    status: row.status,
    email: row.email,
    profileId: row.profile_id,
    handle: row.handle,
    displayName: row.display_name,
    accountType: row.account_type,
    verificationState: row.verification_state ?? "required",
    approximateLocationLabel: row.approximate_location_label,
    locationVisibility: row.location_visibility,
  };
}

export async function revokeSession(db: D1Database, tokenHash: string) {
  const now = nowSeconds();
  await db.prepare("UPDATE sessions SET revoked_at = ? WHERE token_hash = ? AND revoked_at IS NULL").bind(now, tokenHash).run();
}

export async function createRecoveryRequest(db: D1Database, email: string, tokenHash: string) {
  const row = await db.prepare("SELECT user_id FROM auth_identities WHERE provider = 'password' AND identifier = ? LIMIT 1").bind(email).first<{ user_id: string }>();
  if (!row) return false;
  const now = nowSeconds();
  const expiresAt = now + privacyPolicy.retention.passwordRecoverySeconds;
  const securityExpiry = now + privacyPolicy.retention.securityEventDays * 24 * 60 * 60;
  await db.batch([
    db.prepare("UPDATE password_recovery_tokens SET used_at = ? WHERE user_id = ? AND used_at IS NULL").bind(now, row.user_id),
    db.prepare("INSERT INTO password_recovery_tokens (id, user_id, token_hash, expires_at, created_at) VALUES (?, ?, ?, ?, ?)").bind(crypto.randomUUID(), row.user_id, tokenHash, expiresAt, now),
    db.prepare("INSERT INTO security_events (id, user_id, event_type, result, metadata_category, created_at, expires_at) VALUES (?, ?, 'password_recovery', 'requested', 'email', ?, ?)").bind(crypto.randomUUID(), row.user_id, now, securityExpiry),
  ]);
  return true;
}

export async function startVerification(db: D1Database, principal: SessionPrincipal) {
  const now = nowSeconds();
  const verificationId = crypto.randomUUID();
  const providerReferenceHash = await hashOpaqueToken(crypto.randomUUID());
  const profileMember = await db.prepare("SELECT id FROM profile_members WHERE profile_id = ? AND user_id = ? LIMIT 1").bind(principal.profileId, principal.userId).first<{ id: string }>();
  await db.batch([
    db.prepare("INSERT INTO verifications (id, user_id, profile_member_id, state_id, provider, provider_reference_hash, submitted_at, created_at, updated_at) VALUES (?, ?, ?, ?, 'sandbox', ?, ?, ?, ?)").bind(verificationId, principal.userId, profileMember?.id ?? null, verificationStateIds.pending, providerReferenceHash, now, now, now),
    db.prepare("UPDATE profile_members SET verification_state_id = ?, updated_at = ? WHERE profile_id = ? AND user_id = ?").bind(verificationStateIds.pending, now, principal.profileId, principal.userId),
    db.prepare("INSERT INTO consent_records (id, user_id, consent_type, policy_version, source, accepted_at, created_at) VALUES (?, ?, 'verification_processing', ?, 'sandbox', ?, ?)").bind(crypto.randomUUID(), principal.userId, privacyPolicy.policyVersions.verificationProcessing, now, now),
  ]);
}

export async function completeSandboxVerification(db: D1Database, principal: SessionPrincipal, state: "approved" | "failed") {
  const latest = await db.prepare("SELECT id FROM verifications WHERE user_id = ? ORDER BY created_at DESC, rowid DESC LIMIT 1").bind(principal.userId).first<{ id: string }>();
  if (!latest) return false;
  const now = nowSeconds();
  const userStatus = state === "approved" ? "active" : "pending_verification";
  await db.batch([
    db.prepare("UPDATE verifications SET state_id = ?, adult_confirmed_at = ?, reviewed_at = ?, failure_code = ?, updated_at = ? WHERE id = ?")
      .bind(verificationStateIds[state], state === "approved" ? now : null, now, state === "failed" ? "sandbox_not_confirmed" : null, now, latest.id),
    db.prepare("UPDATE profile_members SET verification_state_id = ?, updated_at = ? WHERE profile_id = ? AND user_id = ?").bind(verificationStateIds[state], now, principal.profileId, principal.userId),
    db.prepare("UPDATE users SET status = ?, updated_at = ? WHERE id = ?").bind(userStatus, now, principal.userId),
  ]);
  return true;
}
