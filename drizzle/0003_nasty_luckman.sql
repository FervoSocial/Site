PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_posts` (
	`id` text PRIMARY KEY NOT NULL,
	`author_profile_id` text NOT NULL,
	`body` text NOT NULL,
	`audience` text DEFAULT 'public' NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL,
	`deleted_at` integer,
	FOREIGN KEY (`author_profile_id`) REFERENCES `profiles`(`id`) ON UPDATE no action ON DELETE cascade,
	CONSTRAINT "posts_body_length_check" CHECK(length(trim("body")) BETWEEN 1 AND 1000),
	CONSTRAINT "posts_audience_check" CHECK("audience" IN ('public', 'profile', 'only_me'))
);
--> statement-breakpoint
INSERT INTO `__new_posts`("id", "author_profile_id", "body", "audience", "created_at", "updated_at", "deleted_at") SELECT "id", "author_profile_id", "body", "audience", "created_at", "updated_at", "deleted_at" FROM `posts`;--> statement-breakpoint
DROP TABLE `posts`;--> statement-breakpoint
ALTER TABLE `__new_posts` RENAME TO `posts`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE INDEX `posts_public_feed_idx` ON `posts` (`audience`,`deleted_at`,`created_at`);--> statement-breakpoint
CREATE INDEX `posts_author_created_idx` ON `posts` (`author_profile_id`,`deleted_at`,`created_at`);
