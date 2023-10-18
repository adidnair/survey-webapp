import { sqliteTable, AnySQLiteColumn, text, integer } from "drizzle-orm/sqlite-core"
import { sql } from "drizzle-orm"


export const libsqlWasmFuncTable = sqliteTable("libsql_wasm_func_table", {
	name: text("name").primaryKey().notNull(),
	body: text("body"),
});

export const languageChoices = sqliteTable("language_choices", {
	id: integer("id").primaryKey().notNull(),
	name: text("name").notNull(),
});

export const webTechChoices = sqliteTable("web_tech_choices", {
	id: integer("id").primaryKey().notNull(),
	name: text("name").notNull(),
});

export const people = sqliteTable("people", {
	personId: integer("person_id").primaryKey().notNull(),
	generatedId: text("generated_id").notNull(),
	email: text("email"),
	sex: text("sex").notNull(),
	skill: text("skill").notNull(),
});

export const databaseChoices = sqliteTable("database_choices", {
	id: integer("id").primaryKey().notNull(),
	name: text("name").notNull(),
});
