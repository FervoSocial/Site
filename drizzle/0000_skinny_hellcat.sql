CREATE TABLE `account_types` (
	`id` text PRIMARY KEY NOT NULL,
	`code` text NOT NULL,
	`label_pt_br` text NOT NULL,
	`enabled` integer DEFAULT true NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `account_types_code_unique` ON `account_types` (`code`);--> statement-breakpoint
CREATE TABLE `auth_identities` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`provider` text DEFAULT 'password' NOT NULL,
	`identifier` text NOT NULL,
	`password_hash` text NOT NULL,
	`email_verified_at` integer,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL,
	`last_used_at` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `auth_identities_provider_identifier_unique` ON `auth_identities` (`provider`,`identifier`);--> statement-breakpoint
CREATE INDEX `auth_identities_user_idx` ON `auth_identities` (`user_id`);--> statement-breakpoint
CREATE TABLE `consent_records` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`consent_type` text NOT NULL,
	`policy_version` text NOT NULL,
	`source` text DEFAULT 'web' NOT NULL,
	`accepted_at` integer NOT NULL,
	`withdrawn_at` integer,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `consent_records_user_type_idx` ON `consent_records` (`user_id`,`consent_type`);--> statement-breakpoint
CREATE TABLE `password_recovery_tokens` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`token_hash` text NOT NULL,
	`expires_at` integer NOT NULL,
	`used_at` integer,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `password_recovery_tokens_hash_unique` ON `password_recovery_tokens` (`token_hash`);--> statement-breakpoint
CREATE INDEX `password_recovery_tokens_user_expiry_idx` ON `password_recovery_tokens` (`user_id`,`expires_at`);--> statement-breakpoint
CREATE TABLE `privacy_settings` (
	`user_id` text PRIMARY KEY NOT NULL,
	`profile_discoverability` text DEFAULT 'members' NOT NULL,
	`message_permission` text DEFAULT 'requests' NOT NULL,
	`show_online_status` integer DEFAULT false NOT NULL,
	`distance_visibility` text DEFAULT 'approximate' NOT NULL,
	`event_attendance_visibility` text DEFAULT 'private' NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `profile_members` (
	`id` text PRIMARY KEY NOT NULL,
	`profile_id` text NOT NULL,
	`user_id` text,
	`public_display_name` text NOT NULL,
	`member_role` text DEFAULT 'owner' NOT NULL,
	`verification_state_id` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`profile_id`) REFERENCES `profiles`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`verification_state_id`) REFERENCES `verification_states`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `profile_members_profile_user_unique` ON `profile_members` (`profile_id`,`user_id`);--> statement-breakpoint
CREATE INDEX `profile_members_profile_idx` ON `profile_members` (`profile_id`);--> statement-breakpoint
CREATE TABLE `profiles` (
	`id` text PRIMARY KEY NOT NULL,
	`owner_user_id` text NOT NULL,
	`account_type_id` text NOT NULL,
	`handle` text NOT NULL,
	`display_name` text NOT NULL,
	`state_code` text,
	`city_name` text,
	`approximate_location_label` text,
	`location_visibility` text DEFAULT 'hidden' NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`owner_user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`account_type_id`) REFERENCES `account_types`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `profiles_owner_user_unique` ON `profiles` (`owner_user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `profiles_handle_unique` ON `profiles` (`handle`);--> statement-breakpoint
CREATE INDEX `profiles_account_type_idx` ON `profiles` (`account_type_id`);--> statement-breakpoint
CREATE INDEX `profiles_approximate_location_idx` ON `profiles` (`state_code`,`city_name`);--> statement-breakpoint
CREATE TABLE `security_events` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text,
	`event_type` text NOT NULL,
	`result` text NOT NULL,
	`metadata_category` text,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`expires_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE INDEX `security_events_user_created_idx` ON `security_events` (`user_id`,`created_at`);--> statement-breakpoint
CREATE INDEX `security_events_expiry_idx` ON `security_events` (`expires_at`);--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`token_hash` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`last_seen_at` integer DEFAULT (unixepoch()) NOT NULL,
	`expires_at` integer NOT NULL,
	`revoked_at` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `sessions_token_hash_unique` ON `sessions` (`token_hash`);--> statement-breakpoint
CREATE INDEX `sessions_user_idx` ON `sessions` (`user_id`);--> statement-breakpoint
CREATE INDEX `sessions_expiry_idx` ON `sessions` (`expires_at`);--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`role` text DEFAULT 'member' NOT NULL,
	`status` text DEFAULT 'pending_verification' NOT NULL,
	`locale` text DEFAULT 'pt-BR' NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL,
	`last_login_at` integer,
	`retention_review_at` integer,
	`deleted_at` integer
);
--> statement-breakpoint
CREATE INDEX `users_status_idx` ON `users` (`status`);--> statement-breakpoint
CREATE INDEX `users_role_idx` ON `users` (`role`);--> statement-breakpoint
CREATE TABLE `verification_states` (
	`id` text PRIMARY KEY NOT NULL,
	`code` text NOT NULL,
	`label_pt_br` text NOT NULL,
	`grants_app_access` integer DEFAULT false NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `verification_states_code_unique` ON `verification_states` (`code`);--> statement-breakpoint
CREATE TABLE `verifications` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`profile_member_id` text,
	`state_id` text NOT NULL,
	`provider` text DEFAULT 'sandbox' NOT NULL,
	`provider_reference_hash` text,
	`adult_confirmed_at` integer,
	`submitted_at` integer,
	`reviewed_at` integer,
	`failure_code` text,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`profile_member_id`) REFERENCES `profile_members`(`id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`state_id`) REFERENCES `verification_states`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `verifications_user_created_idx` ON `verifications` (`user_id`,`created_at`);--> statement-breakpoint
CREATE INDEX `verifications_state_idx` ON `verifications` (`state_id`);--> statement-breakpoint
INSERT OR IGNORE INTO `account_types` (`id`, `code`, `label_pt_br`, `enabled`) VALUES
  ('account-type-private', 'private', 'Conta privada', 1),
  ('account-type-club-business', 'club_business', 'Clube ou negócio', 1),
  ('account-type-event-organizer', 'event_organizer', 'Organizador de eventos', 1),
  ('account-type-professional', 'professional', 'Profissional', 1);--> statement-breakpoint
INSERT OR IGNORE INTO `verification_states` (`id`, `code`, `label_pt_br`, `grants_app_access`) VALUES
  ('verification-required', 'required', 'Verificação necessária', 0),
  ('verification-pending', 'pending', 'Em análise', 0),
  ('verification-approved', 'approved', 'Idade confirmada', 1),
  ('verification-failed', 'failed', 'Verificação não concluída', 0);
