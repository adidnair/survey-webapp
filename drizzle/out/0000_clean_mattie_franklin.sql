-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `libsql_wasm_func_table` (
	`name` text PRIMARY KEY NOT NULL,
	`body` text
);
--> statement-breakpoint
CREATE TABLE `people` (
	`id` integer PRIMARY KEY NOT NULL,
	`generated_id` text NOT NULL,
	`email` text,
	`gender` text NOT NULL,
	`skill` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `language_responses` (
	`person_id` integer NOT NULL,
	`language_id` integer NOT NULL,
	`proficiency` integer NOT NULL,
	`likeability` integer NOT NULL,
	`purpose` text NOT NULL,
	FOREIGN KEY (`language_id`) REFERENCES `language_choices`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`person_id`) REFERENCES `people`(`id`) ON UPDATE no action ON DELETE cascade
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
CREATE UNIQUE INDEX `uuid` ON `people` (`generated_id`);--> statement-breakpoint
CREATE INDEX `lang_person_idx` ON `language_responses` (`person_id`);--> statement-breakpoint
CREATE INDEX `lang_idx` ON `language_responses` (`language_id`);
*/