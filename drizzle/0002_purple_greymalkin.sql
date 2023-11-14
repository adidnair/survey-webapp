CREATE TABLE `database_choices` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `language_choices` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`verified` integer DEFAULT 0 NOT NULL 
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
CREATE TABLE `web_tech_choices` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
DROP TABLE `database_responses`;--> statement-breakpoint
DROP TABLE `framework_responses`;--> statement-breakpoint
DROP TABLE `languages`;--> statement-breakpoint
DROP TABLE `web_frameworks`;--> statement-breakpoint
ALTER TABLE language_responses ADD `person_id` integer NOT NULL REFERENCES people(id);--> statement-breakpoint
ALTER TABLE language_responses ADD `language_id` integer NOT NULL REFERENCES language_choices(id);--> statement-breakpoint
ALTER TABLE language_responses ADD `proficiency` integer NOT NULL;--> statement-breakpoint
ALTER TABLE language_responses ADD `likeability` integer NOT NULL;--> statement-breakpoint
ALTER TABLE language_responses ADD `purpose` text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `uuid` ON `people` (`generated_id`);--> statement-breakpoint
CREATE INDEX `lang_person_idx` ON `language_responses` (`person_id`);--> statement-breakpoint
CREATE INDEX `lang_idx` ON `language_responses` (`language_id`);--> statement-breakpoint
/*
 SQLite does not support "Creating foreign key on existing column" out of the box, we do not generate automatic migration for that, so it has to be done manually
 Please refer to: https://www.techonthenet.com/sqlite/tables/alter_table.php
                  https://www.sqlite.org/lang_altertable.html

 Due to that we don't generate migration automatically and it has to be done manually
*/--> statement-breakpoint
ALTER TABLE `language_responses` DROP COLUMN `user_id`;--> statement-breakpoint
ALTER TABLE `language_responses` DROP COLUMN `language`;--> statement-breakpoint
ALTER TABLE `language_responses` DROP COLUMN `skill`;--> statement-breakpoint
ALTER TABLE `language_responses` DROP COLUMN `recommendation`;
