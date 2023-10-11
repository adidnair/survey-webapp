import { sqliteTable, AnySQLiteColumn, text, integer } from "drizzle-orm/sqlite-core"
import { sql } from "drizzle-orm"


export const libsqlWasmFuncTable = sqliteTable("libsql_wasm_func_table", {
	name: text("name").primaryKey().notNull(),
	body: text("body"),
});

export const languages = sqliteTable("languages", {
	id: integer("id").primaryKey(),
	name: text("name").notNull(),
});

export const webFrameworks = sqliteTable("web_frameworks", {
	id: integer("id").primaryKey(),
	name: text("name").notNull(),
});