-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `libsql_wasm_func_table` (
	`name` text PRIMARY KEY NOT NULL,
	`body` text
);
--> statement-breakpoint
CREATE TABLE `languages` (
	`id` integer PRIMARY KEY,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `web_frameworks` (
	`id` integer PRIMARY KEY,
	`name` text NOT NULL
);

*/