import { sqliteTable, AnySQLiteColumn, text, integer, index, foreignKey, uniqueIndex } from "drizzle-orm/sqlite-core"
import { sql } from "drizzle-orm"


export const libsqlWasmFuncTable = sqliteTable("libsql_wasm_func_table", {
	name: text("name").primaryKey().notNull(),
	body: text("body"),
});

export const languageChoices = sqliteTable("language_choices", {
	id: integer("id").primaryKey().notNull(),
	name: text("name").notNull(),
	verified: integer("verified").default(0).notNull(),
});

export const webTechChoices = sqliteTable("web_tech_choices", {
	id: integer("id").primaryKey().notNull(),
	name: text("name").notNull(),
	verified: integer("verified").default(0).notNull(),
});

export const databaseChoices = sqliteTable("database_choices", {
	id: integer("id").primaryKey().notNull(),
	name: text("name").notNull(),
	verified: integer("verified").default(0).notNull(),
});

export const webTechResponses = sqliteTable("web_tech_responses", {
	personId: integer("person_id").notNull().references(() => people.id, { onDelete: "cascade" } ),
	webTechId: integer("web_tech_id").notNull().references(() => webTechChoices.id, { onDelete: "cascade" } ),
	proficiency: integer("proficiency").notNull(),
	likeability: integer("likeability").notNull(),
	purpose: text("purpose").notNull(),
},
(table) => {
	return {
		webTechIdx: index("web_tech_idx").on(table.webTechId),
		webTechPersonIdx: index("web_tech_person_idx").on(table.personId),
	}
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
		langIdx: index("lang_idx").on(table.languageId),
		langPersonIdx: index("lang_person_idx").on(table.personId),
	}
});

export const databaseResponses = sqliteTable("database_responses", {
	personId: integer("person_id").notNull().references(() => people.id, { onDelete: "cascade" } ),
	databaseId: integer("database_id").notNull().references(() => databaseChoices.id, { onDelete: "cascade" } ),
	proficiency: integer("proficiency").notNull(),
	likeability: integer("likeability").notNull(),
	purpose: text("purpose").notNull(),
},
(table) => {
	return {
		dbPersonIdx: index("db_person_idx").on(table.personId),
		dbIdx: index("db_idx").on(table.databaseId),
	}
});

export const editorChoices = sqliteTable("editor_choices", {
	id: integer("id").primaryKey().notNull(),
	name: text("name").notNull(),
	verified: integer("verified").default(0).notNull(),
});

export const editorResponses = sqliteTable("editor_responses", {
	personId: integer("person_id").notNull().references(() => people.id, { onDelete: "cascade" } ),
	editorId: integer("editor_id").notNull().references(() => editorChoices.id, { onDelete: "cascade" } ),
	rating: integer("rating").notNull(),
	purpose: text("purpose").notNull(),
},
(table) => {
	return {
		editorPersonIdx: index("editor_person_idx").on(table.personId),
		editorIdx: index("editor_idx").on(table.editorId),
	}
});

export const osChoices = sqliteTable("os_choices", {
	id: integer("id").primaryKey().notNull(),
	name: text("name").notNull(),
	verified: integer("verified").default(0).notNull(),
});

export const osResponses = sqliteTable("os_responses", {
	personId: integer("person_id").notNull().references(() => people.id, { onDelete: "cascade" } ),
	osId: integer("os_id").notNull().references(() => osChoices.id, { onDelete: "cascade" } ),
	rating: integer("rating").notNull(),
	purpose: text("purpose").notNull(),
},
(table) => {
	return {
		osPersonIdx: index("os_person_idx").on(table.personId),
		osIdx: index("os_idx").on(table.osId),
	}
});

export const cloudChoices = sqliteTable("cloud_choices", {
	id: integer("id").primaryKey().notNull(),
	name: text("name").notNull(),
	verified: integer("verified").default(0).notNull(),
});

export const cloudResponses = sqliteTable("cloud_responses", {
	personId: integer("person_id").notNull().references(() => people.id, { onDelete: "cascade" } ),
	cloudId: integer("cloud_id").notNull().references(() => cloudChoices.id, { onDelete: "cascade" } ),
	rating: integer("rating").notNull(),
	purpose: text("purpose").notNull(),
},
(table) => {
	return {
		cloudPersonIdx: index("cloud_person_idx").on(table.personId),
		cloudIdx: index("cloud_idx").on(table.cloudId),
	}
});

export const appTechChoices = sqliteTable("app_tech_choices", {
	id: integer("id").primaryKey().notNull(),
	name: text("name").notNull(),
	verified: integer("verified").default(0).notNull(),
});

export const appTechResponses = sqliteTable("app_tech_responses", {
	personId: integer("person_id").notNull().references(() => people.id, { onDelete: "cascade" } ),
	appTechId: integer("app_tech_id").notNull().references(() => appTechChoices.id, { onDelete: "cascade" } ),
	proficiency: integer("proficiency").notNull(),
	likeability: integer("likeability").notNull(),
	purpose: text("purpose").notNull(),
},
(table) => {
	return {
		appTechPersonIdx: index("app_tech_person_idx").on(table.personId),
		appTechIdx: index("app_tech_idx").on(table.appTechId),
	}
});

export const otherTechChoices = sqliteTable("other_tech_choices", {
	id: integer("id").primaryKey().notNull(),
	name: text("name").notNull(),
	verified: integer("verified").default(0).notNull(),
});

export const otherTechResponses = sqliteTable("other_tech_responses", {
	personId: integer("person_id").notNull().references(() => people.id, { onDelete: "cascade" } ),
	otherTechId: integer("other_tech_id").notNull().references(() => otherTechChoices.id, { onDelete: "cascade" } ),
	proficiency: integer("proficiency").notNull(),
	likeability: integer("likeability").notNull(),
	purpose: text("purpose").notNull(),
},
(table) => {
	return {
		otherTechPersonIdx: index("other_tech_person_idx").on(table.personId),
		otherTechIdx: index("other_tech_idx").on(table.otherTechId),
	}
});

export const people = sqliteTable("people", {
	id: integer("id").primaryKey().notNull(),
	generatedId: text("generated_id").notNull(),
	email: text("email").notNull(),
	gender: text("gender").notNull(),
	skill: text("skill").notNull(),
	occupation: text("occupation").notNull(),
},
(table) => {
	return {
		uuid: uniqueIndex("uuid").on(table.generatedId),
	}
});