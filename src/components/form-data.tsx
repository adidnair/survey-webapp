import { db } from "@/db/db";
import { databaseChoices, languageChoices, webTechChoices } from "../../drizzle/out/schema";

const getDbPromise = async () => {
  // Get data
  const langs = await db.select().from(languageChoices).all()
  const webtechs = await db.select().from(webTechChoices).all()
  const databases = await db.select().from(databaseChoices).all()

  // Calculate largest 
  const largest_lang = langs.reduce((prev, curr) => {
    return (prev && prev.id > curr.id) ? prev : curr
  }).id
  const largest_webtech = webtechs.reduce((prev, curr) => {
    return (prev && prev.id > curr.id) ? prev : curr
  }).id
  const largest_database = databases.reduce((prev, curr) => {
    return (prev && prev.id > curr.id) ? prev : curr
  }).id

  // set name arrays
  let lang_names: string[] = Array(largest_lang+1)
  for (const lang of langs) {
    lang_names[lang.id] = lang.name
  }
  let webtech_names: string[] = Array(largest_webtech+1)
  for (const webf of webtechs) {
    webtech_names[webf.id] = webf.name
  }
  let db_names: string[] = Array(largest_webtech+1)
  for (const db of databases) {
    db_names[db.id] = db.name
  }

  const lang_ids = (langs.map((lang) => lang.id))  
  const webtech_ids = (webtechs.map((webf) => webf.id))
  const db_ids = (databases.map((db) => db.id))

  console.log("database query promise created.")
  return {
    languages: {
      ids: lang_ids.sort((a, b) => lang_names[a].localeCompare(lang_names[b])),
      names: lang_names,
    },
    webTechnologies: {
      ids: webtech_ids.sort((a, b) => webtech_names[a].localeCompare(webtech_names[b])),
      names: webtech_names,
    },
    databases: {
      ids: db_ids.sort((a, b) => db_names[a].localeCompare(db_names[b])),
      names: db_names,
    },
  }
}

export const dbPromise = getDbPromise()

export type formType = {
  email: string,
  age: number,
  sex: string,
  skill: string,
  // occupation: string,
  languages: {
      id: number,
      proficiency: number,
      recommendation: number,
      purpose: string,
  }[],
  webTechnologies: {
      id: number,
      proficiency: number,
      recommendation: number,
      purpose: string,
  }[]
  databases: {
      id: number,
      proficiency: number,
      recommendation: number,
      purpose: string,
  }[]
}
