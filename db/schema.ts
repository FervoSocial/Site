import { sql } from "drizzle-orm";
import { check, index, integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

const createdAt = integer("created_at", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`);
const updatedAt = integer("updated_at", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`);

export const accountTypes = sqliteTable("account_types", {
  id: text("id").primaryKey(),
  code: text("code", { enum: ["private", "club_business", "event_organizer", "professional"] }).notNull(),
  labelPtBr: text("label_pt_br").notNull(),
  enabled: integer("enabled", { mode: "boolean" }).notNull().default(true),
  createdAt,
}, (table) => [uniqueIndex("account_types_code_unique").on(table.code)]);

export const verificationStates = sqliteTable("verification_states", {
  id: text("id").primaryKey(),
  code: text("code", { enum: ["required", "pending", "approved", "failed"] }).notNull(),
  labelPtBr: text("label_pt_br").notNull(),
  grantsAppAccess: integer("grants_app_access", { mode: "boolean" }).notNull().default(false),
  createdAt,
}, (table) => [uniqueIndex("verification_states_code_unique").on(table.code)]);

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  role: text("role", { enum: ["member", "moderator", "admin"] }).notNull().default("member"),
  status: text("status", { enum: ["pending_verification", "active", "suspended", "deleted"] }).notNull().default("pending_verification"),
  locale: text("locale").notNull().default("pt-BR"),
  createdAt,
  updatedAt,
  lastLoginAt: integer("last_login_at", { mode: "timestamp" }),
  retentionReviewAt: integer("retention_review_at", { mode: "timestamp" }),
  deletedAt: integer("deleted_at", { mode: "timestamp" }),
}, (table) => [index("users_status_idx").on(table.status), index("users_role_idx").on(table.role)]);

export const authIdentities = sqliteTable("auth_identities", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  provider: text("provider", { enum: ["password"] }).notNull().default("password"),
  identifier: text("identifier").notNull(),
  passwordHash: text("password_hash").notNull(),
  emailVerifiedAt: integer("email_verified_at", { mode: "timestamp" }),
  createdAt,
  updatedAt,
  lastUsedAt: integer("last_used_at", { mode: "timestamp" }),
}, (table) => [
  uniqueIndex("auth_identities_provider_identifier_unique").on(table.provider, table.identifier),
  index("auth_identities_user_idx").on(table.userId),
]);

export const profiles = sqliteTable("profiles", {
  id: text("id").primaryKey(),
  ownerUserId: text("owner_user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  accountTypeId: text("account_type_id").notNull().references(() => accountTypes.id),
  handle: text("handle").notNull(),
  displayName: text("display_name").notNull(),
  stateCode: text("state_code"),
  cityName: text("city_name"),
  approximateLocationLabel: text("approximate_location_label"),
  locationVisibility: text("location_visibility", { enum: ["hidden", "city", "state"] }).notNull().default("hidden"),
  createdAt,
  updatedAt,
}, (table) => [
  uniqueIndex("profiles_owner_user_unique").on(table.ownerUserId),
  uniqueIndex("profiles_handle_unique").on(table.handle),
  index("profiles_account_type_idx").on(table.accountTypeId),
  index("profiles_approximate_location_idx").on(table.stateCode, table.cityName),
]);

export const posts = sqliteTable("posts", {
  id: text("id").primaryKey(),
  authorProfileId: text("author_profile_id").notNull().references(() => profiles.id, { onDelete: "cascade" }),
  body: text("body").notNull(),
  audience: text("audience", { enum: ["public"] }).notNull().default("public"),
  createdAt,
  updatedAt,
  deletedAt: integer("deleted_at", { mode: "timestamp" }),
}, (table) => [
  index("posts_public_feed_idx").on(table.audience, table.deletedAt, table.createdAt),
  index("posts_author_created_idx").on(table.authorProfileId, table.deletedAt, table.createdAt),
  check("posts_body_length_check", sql`length(trim(${table.body})) BETWEEN 1 AND 1000`),
  check("posts_public_audience_check", sql`${table.audience} = 'public'`),
]);

export const profileMembers = sqliteTable("profile_members", {
  id: text("id").primaryKey(),
  profileId: text("profile_id").notNull().references(() => profiles.id, { onDelete: "cascade" }),
  userId: text("user_id").references(() => users.id, { onDelete: "set null" }),
  publicDisplayName: text("public_display_name").notNull(),
  memberRole: text("member_role", { enum: ["owner", "member"] }).notNull().default("owner"),
  verificationStateId: text("verification_state_id").notNull().references(() => verificationStates.id),
  createdAt,
  updatedAt,
}, (table) => [
  uniqueIndex("profile_members_profile_user_unique").on(table.profileId, table.userId),
  index("profile_members_profile_idx").on(table.profileId),
]);

export const sessions = sqliteTable("sessions", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  tokenHash: text("token_hash").notNull(),
  createdAt,
  lastSeenAt: integer("last_seen_at", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  revokedAt: integer("revoked_at", { mode: "timestamp" }),
}, (table) => [
  uniqueIndex("sessions_token_hash_unique").on(table.tokenHash),
  index("sessions_user_idx").on(table.userId),
  index("sessions_expiry_idx").on(table.expiresAt),
]);

export const verifications = sqliteTable("verifications", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  profileMemberId: text("profile_member_id").references(() => profileMembers.id, { onDelete: "set null" }),
  stateId: text("state_id").notNull().references(() => verificationStates.id),
  provider: text("provider").notNull().default("sandbox"),
  providerReferenceHash: text("provider_reference_hash"),
  adultConfirmedAt: integer("adult_confirmed_at", { mode: "timestamp" }),
  submittedAt: integer("submitted_at", { mode: "timestamp" }),
  reviewedAt: integer("reviewed_at", { mode: "timestamp" }),
  failureCode: text("failure_code"),
  createdAt,
  updatedAt,
}, (table) => [
  index("verifications_user_created_idx").on(table.userId, table.createdAt),
  index("verifications_state_idx").on(table.stateId),
]);

export const consentRecords = sqliteTable("consent_records", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  consentType: text("consent_type", { enum: ["adult_attestation", "terms", "privacy", "verification_processing"] }).notNull(),
  policyVersion: text("policy_version").notNull(),
  source: text("source").notNull().default("web"),
  acceptedAt: integer("accepted_at", { mode: "timestamp" }).notNull(),
  withdrawnAt: integer("withdrawn_at", { mode: "timestamp" }),
  createdAt,
}, (table) => [index("consent_records_user_type_idx").on(table.userId, table.consentType)]);

export const passwordRecoveryTokens = sqliteTable("password_recovery_tokens", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  tokenHash: text("token_hash").notNull(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  usedAt: integer("used_at", { mode: "timestamp" }),
  createdAt,
}, (table) => [
  uniqueIndex("password_recovery_tokens_hash_unique").on(table.tokenHash),
  index("password_recovery_tokens_user_expiry_idx").on(table.userId, table.expiresAt),
]);

export const privacySettings = sqliteTable("privacy_settings", {
  userId: text("user_id").primaryKey().references(() => users.id, { onDelete: "cascade" }),
  profileDiscoverability: text("profile_discoverability", { enum: ["members", "hidden"] }).notNull().default("members"),
  messagePermission: text("message_permission", { enum: ["requests", "following", "none"] }).notNull().default("requests"),
  showOnlineStatus: integer("show_online_status", { mode: "boolean" }).notNull().default(false),
  distanceVisibility: text("distance_visibility", { enum: ["approximate", "hidden"] }).notNull().default("approximate"),
  eventAttendanceVisibility: text("event_attendance_visibility", { enum: ["members", "private"] }).notNull().default("private"),
  createdAt,
  updatedAt,
});

export const securityEvents = sqliteTable("security_events", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => users.id, { onDelete: "set null" }),
  eventType: text("event_type").notNull(),
  result: text("result", { enum: ["success", "rejected", "requested"] }).notNull(),
  metadataCategory: text("metadata_category"),
  createdAt,
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
}, (table) => [
  index("security_events_user_created_idx").on(table.userId, table.createdAt),
  index("security_events_expiry_idx").on(table.expiresAt),
]);
