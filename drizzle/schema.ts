import { sqliteTable, AnySQLiteColumn, text, integer } from "drizzle-orm/sqlite-core"
import { sql } from "drizzle-orm"


export const libsqlWasmFuncTable = sqliteTable("libsql_wasm_func_table", {
	name: text("name").primaryKey().notNull(),
	body: text("body"),
});

export const languageResponses = sqliteTable("language_responses", {
	userId: integer("user_id"),
	language: text("language"),
	skill: integer("skill"),
	recommendation: integer("recommendation"),
});

export const frameworkResponses = sqliteTable("framework_responses", {
	userId: integer("user_id"),
	framework: text("framework"),
	skill: integer("skill"),
	recommendation: integer("recommendation"),
});

export const databaseResponses = sqliteTable("database_responses", {
	userId: integer("user_id"),
	database: text("database"),
	skill: integer("skill"),
	recommendation: integer("recommendation"),
});

export const webFrameworks = sqliteTable("web_frameworks", {
	id: integer("id").primaryKey(),
	name: text("name").notNull(),
});

export const languages = sqliteTable("languages", {
	id: integer("id").primaryKey(),
	name: text("name").notNull(),
});