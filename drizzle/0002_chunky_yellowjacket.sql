CREATE TABLE `post_media` (
	`id` text PRIMARY KEY NOT NULL,
	`post_id` text NOT NULL,
	`owner_profile_id` text NOT NULL,
	`object_key` text NOT NULL,
	`media_type` text NOT NULL,
	`mime_type` text NOT NULL,
	`byte_size` integer NOT NULL,
	`attestation_version` text NOT NULL,
	`attested_at` integer NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`deleted_at` integer,
	FOREIGN KEY (`post_id`) REFERENCES `posts`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`owner_profile_id`) REFERENCES `profiles`(`id`) ON UPDATE no action ON DELETE cascade,
	CONSTRAINT "post_media_type_check" CHECK("post_media"."media_type" IN ('image', 'video')),
	CONSTRAINT "post_media_size_check" CHECK("post_media"."byte_size" > 0)
);
--> statement-breakpoint
CREATE UNIQUE INDEX `post_media_post_unique` ON `post_media` (`post_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `post_media_object_key_unique` ON `post_media` (`object_key`);--> statement-breakpoint
CREATE INDEX `post_media_owner_created_idx` ON `post_media` (`owner_profile_id`,`deleted_at`,`created_at`);