import { db } from "@/db/db";
import { databaseChoices, databaseResponses, languageChoices, languageResponses, people, webTechChoices, webTechResponses } from "../../drizzle/out/schema";
import { eq } from "drizzle-orm";

export type formType = {
  email: string,
  age: number,
  gender: string,
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
  }[],
  databases: {
      id: number,
      proficiency: number,
      recommendation: number,
      purpose: string,
  }[],
  newLanguages: {
    id: number,
    name: string,
  }[],
}

const get_submission = async (person_id: string): Promise<-1 | 0 | formType> => {
  try {
    const db_response = await db
      .select()
      .from(people)
      .where(eq(people.generatedId, person_id))
    if (db_response.length === 0) {
      return 0
    }
    if (db_response.length !== 1) {
      console.log("Error: more than one entry for same generated ID. This should not happen")
      return -1
    }
    const person = db_response[0]

    const language_db_response = await db
      .select()
      .from(languageResponses)
      .where(eq(languageResponses.personId, person.id))

    let languages: formType["languages"] = []
    if (language_db_response.length !== 0) {
      languages = language_db_response
        .map((entry) => {
          return {
            id: entry.languageId,
            proficiency: entry.proficiency,
            recommendation: entry.likeability,
            purpose: entry.purpose,
          }
        })
    }

    const web_tech_db_response = await db
      .select()
      .from(webTechResponses)
      .where(eq(webTechResponses.personId, person.id))

    let webTechnologies: formType["webTechnologies"] = []
    if (web_tech_db_response.length !== 0) {
      webTechnologies = web_tech_db_response
        .map((entry) => {
          return {
            id: entry.webTechId,
            proficiency: entry.proficiency,
            recommendation: entry.likeability,
            purpose: entry.purpose,
          }
        })
    }

    const database_db_response = await db
      .select()
      .from(databaseResponses)
      .where(eq(databaseResponses.personId, person.id))

    let databases: formType["databases"] = []
    if (database_db_response.length !== 0) {
      databases = database_db_response
        .map((entry) => {
          return {
            id: entry.databaseId,
            proficiency: entry.proficiency,
            recommendation: entry.likeability,
            purpose: entry.purpose,
          }
        })
    }

    return {
      email: person.email,
      age: 18,
      gender: person.gender,
      skill: person.skill,
      // occupation: string,
      languages: languages,
      webTechnologies: webTechnologies,
      databases: databases,
      newLanguages: [],
    }
  } catch (err) {
    console.log("Error: error while retreiving previous form submission")
    console.log(err)
    return -1
  }
}

export const getDbPromise = async (prevFilledId: null | string) => {
  try {
    // Get data
    const langs = await db.select().from(languageChoices).where(eq(languageChoices.verified, 1))
    const webtechs = await db.select().from(webTechChoices).where(eq(webTechChoices.verified, 1))
    const databases = await db.select().from(databaseChoices).where(eq(databaseChoices.verified, 1))

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
    let db_names: string[] = Array(largest_database+1)
    for (const db of databases) {
      db_names[db.id] = db.name
    }

    const lang_ids = (langs.map((lang) => lang.id))  
    const webtech_ids = (webtechs.map((webf) => webf.id))
    const db_ids = (databases.map((db) => db.id))

    let prevData: Awaited<ReturnType<typeof get_submission>> | null = null
    if (prevFilledId !== null) {
      prevData = await get_submission(prevFilledId)
    }

    console.log("database query promise created.")
    return {
      options: {
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
      },
      prevFilledData: prevData
    }
  } catch (err) {
    console.log("Error: error while creating db promise")
    console.log(err)
    return -1
  }
}
