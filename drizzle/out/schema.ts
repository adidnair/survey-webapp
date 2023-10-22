import { sqliteTable, AnySQLiteColumn, text, integer, uniqueIndex, index, foreignKey } from "drizzle-orm/sqlite-core"
import { sql } from "drizzle-orm"


export const libsqlWasmFuncTable = sqliteTable("libsql_wasm_func_table", {
	name: text("name").primaryKey().notNull(),
	body: text("body"),
});

export const languageChoices = sqliteTable("language_choices", {
	id: integer("id").primaryKey(),
	name: text("name").notNull(),
});

export const webTechChoices = sqliteTable("web_tech_choices", {
	id: integer("id").primaryKey(),
	name: text("name").notNull(),
});

export const people = sqliteTable("people", {
	id: integer("id").primaryKey().notNull(),
	generatedId: text("generated_id").notNull(),
	email: text("email"),
	gender: text("gender").notNull(),
	skill: text("skill").notNull(),
},
(table) => {
	return {
		uuid: uniqueIndex("uuid").on(table.generatedId),
	}
});

export const databaseChoices = sqliteTable("database_choices", {
	id: integer("id").primaryKey().notNull(),
	name: text("name").notNull(),
});

export const languageResponses = sqliteTable("language_responses", {
	personId: integer("person_id").notNull().references(() => people.id, { onDelete: "cascade" } ),
	languageId: integer("language_id").notNull().references(() => languageChoices.id, { onDelete: "cascade" } ),
	proficiency: integer("proficiency").notNull(),
	likeability: integer("likeability").notNull(),
	purpose: text("purpose").notNull(),
},
(table) => {
	return {
		langPersonIdx: index("lang_person_idx").on(table.personId),
		langIdx: index("lang_idx").on(table.languageId),
	}
});