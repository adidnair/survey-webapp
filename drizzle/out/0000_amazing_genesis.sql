-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `libsql_wasm_func_table` (
	`name` text PRIMARY KEY NOT NULL,
	`body` text
);
--> statement-breakpoint
CREATE TABLE `language_choices` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`verified` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `web_tech_choices` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`verified` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `database_choices` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`verified` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `people` (
	`id` integer PRIMARY KEY NOT NULL,
	`generated_id` text NOT NULL,
	`email` text NOT NULL,
	`gender` text NOT NULL,
	`skill` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `web_tech_responses` (
	`person_id` integer NOT NULL,
	`web_tech_id` integer NOT NULL,
	`proficiency` integer NOT NULL,
	`likeability` integer NOT NULL,
	`purpose` text NOT NULL,
	FOREIGN KEY (`person_id`) REFERENCES `people`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`web_tech_id`) REFERENCES `web_tech_choices`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `language_responses` (
	`person_id` integer NOT NULL,
	`language_id` integer NOT NULL,
	`proficiency` integer NOT NULL,
	`likeability` integer NOT NULL,
	`purpose` text NOT NULL,
	FOREIGN KEY (`person_id`) REFERENCES `people`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`language_id`) REFERENCES `language_choices`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `database_responses` (
	`person_id` integer NOT NULL,
	`database_id` integer NOT NULL,
	`proficiency` integer NOT NULL,
	`likeability` integer NOT NULL,
	`purpose` text NOT NULL,
	FOREIGN KEY (`database_id`) REFERENCES `database_choices`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`person_id`) REFERENCES `people`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `editor_choices` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`verified` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `editor_responses` (
	`person_id` integer NOT NULL,
	`editor_id` integer NOT NULL,
	`rating` integer NOT NULL,
	`purpose` text NOT NULL,
	FOREIGN KEY (`editor_id`) REFERENCES `editor_choices`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`person_id`) REFERENCES `people`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `os_choices` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`verified` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `os_responses` (
	`person_id` integer NOT NULL,
	`os_id` integer NOT NULL,
	`rating` integer NOT NULL,
	`purpose` text NOT NULL,
	FOREIGN KEY (`os_id`) REFERENCES `os_choices`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`person_id`) REFERENCES `people`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `cloud_choices` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`verified` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `cloud_responses` (
	`person_id` integer NOT NULL,
	`cloud_id` integer NOT NULL,
	`rating` integer NOT NULL,
	`purpose` text NOT NULL,
	FOREIGN KEY (`cloud_id`) REFERENCES `cloud_choices`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`person_id`) REFERENCES `people`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `app_tech_choices` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`verified` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `app_tech_responses` (
	`person_id` integer NOT NULL,
	`app_tech_id` integer NOT NULL,
	`proficiency` integer NOT NULL,
	`likeability` integer NOT NULL,
	`purpose` text NOT NULL,
	FOREIGN KEY (`app_tech_id`) REFERENCES `app_tech_choices`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`person_id`) REFERENCES `people`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `other_tech_choices` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`verified` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `other_tech_responses` (
	`person_id` integer NOT NULL,
	`other_tech_id` integer NOT NULL,
	`proficiency` integer NOT NULL,
	`likeability` integer NOT NULL,
	`purpose` text NOT NULL,
	FOREIGN KEY (`other_tech_id`) REFERENCES `other_tech_choices`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`person_id`) REFERENCES `people`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `uuid` ON `people` (`generated_id`);--> statement-breakpoint
CREATE INDEX `web_tech_idx` ON `web_tech_responses` (`web_tech_id`);--> statement-breakpoint
CREATE INDEX `web_tech_person_idx` ON `web_tech_responses` (`person_id`);--> statement-breakpoint
CREATE INDEX `lang_idx` ON `language_responses` (`language_id`);--> statement-breakpoint
CREATE INDEX `lang_person_idx` ON `language_responses` (`person_id`);--> statement-breakpoint
CREATE INDEX `db_person_idx` ON `database_responses` (`person_id`);--> statement-breakpoint
CREATE INDEX `db_idx` ON `database_responses` (`database_id`);--> statement-breakpoint
CREATE INDEX `editor_person_idx` ON `editor_responses` (`person_id`);--> statement-breakpoint
CREATE INDEX `editor_idx` ON `editor_responses` (`editor_id`);--> statement-breakpoint
CREATE INDEX `os_person_idx` ON `os_responses` (`person_id`);--> statement-breakpoint
CREATE INDEX `os_idx` ON `os_responses` (`os_id`);--> statement-breakpoint
CREATE INDEX `cloud_person_idx` ON `cloud_responses` (`person_id`);--> statement-breakpoint
CREATE INDEX `cloud_idx` ON `cloud_responses` (`cloud_id`);--> statement-breakpoint
CREATE INDEX `app_tech_person_idx` ON `app_tech_responses` (`person_id`);--> statement-breakpoint
CREATE INDEX `app_tech_idx` ON `app_tech_responses` (`app_tech_id`);--> statement-breakpoint
CREATE INDEX `other_tech_person_idx` ON `other_tech_responses` (`person_id`);--> statement-breakpoint
CREATE INDEX `other_tech_idx` ON `other_tech_responses` (`other_tech_id`);
*/