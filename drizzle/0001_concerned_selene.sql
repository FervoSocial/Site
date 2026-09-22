CREATE TABLE `posts` (
	`id` text PRIMARY KEY NOT NULL,
	`author_profile_id` text NOT NULL,
	`body` text NOT NULL,
	`audience` text DEFAULT 'public' NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL,
	`deleted_at` integer,
	FOREIGN KEY (`author_profile_id`) REFERENCES `profiles`(`id`) ON UPDATE no action ON DELETE cascade,
	CONSTRAINT "posts_body_length_check" CHECK(length(trim("posts"."body")) BETWEEN 1 AND 1000),
	CONSTRAINT "posts_public_audience_check" CHECK("posts"."audience" = 'public')
);
--> statement-breakpoint
CREATE INDEX `posts_public_feed_idx` ON `posts` (`audience`,`deleted_at`,`created_at`);--> statement-breakpoint
CREATE INDEX `posts_author_created_idx` ON `posts` (`author_profile_id`,`deleted_at`,`created_at`);