import { db } from "@/db/db";
import { appTechChoices, appTechResponses, cloudChoices, cloudResponses, databaseChoices, databaseResponses, editorChoices, editorResponses, languageChoices, languageResponses, osChoices, osResponses, otherTechChoices, otherTechResponses, people, webTechChoices, webTechResponses } from "../../drizzle/out/schema";
import { eq } from "drizzle-orm";

export type formType = {
  email: string,
  age: number,
  gender: string,
  skill: string,
  occupation: string,
  oss: {
      id: number,
      rating: number,
      purpose: string,
  }[],
  editors: {
      id: number,
      rating: number,
      purpose: string,
  }[],
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
  appTechnologies: {
      id: number,
      proficiency: number,
      recommendation: number,
      purpose: string,
  }[],
  otherTechnologies: {
      id: number,
      proficiency: number,
      recommendation: number,
      purpose: string,
  }[],
  clouds: {
      id: number,
      rating: number,
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

    const os_db_response = await db
      .select()
      .from(osResponses)
      .where(eq(osResponses.personId, person.id))

    let oss: formType["oss"] = []
    if (os_db_response.length !== 0) {
      oss = os_db_response
        .map((entry) => {
          return {
            id: entry.osId,
            rating: entry.rating,
            purpose: entry.purpose,
          }
        })
    }

    const editor_db_response = await db
      .select()
      .from(editorResponses)
      .where(eq(editorResponses.personId, person.id))

    let editors: formType["editors"] = []
    if (editor_db_response.length !== 0) {
      editors = editor_db_response
        .map((entry) => {
          return {
            id: entry.editorId,
            rating: entry.rating,
            purpose: entry.purpose,
          }
        })
    }

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

    const app_tech_db_response = await db
      .select()
      .from(appTechResponses)
      .where(eq(appTechResponses.personId, person.id))

    let appTechnologies: formType["appTechnologies"] = []
    if (app_tech_db_response.length !== 0) {
      appTechnologies = app_tech_db_response
        .map((entry) => {
          return {
            id: entry.appTechId,
            proficiency: entry.proficiency,
            recommendation: entry.likeability,
            purpose: entry.purpose,
          }
        })
    }

    const other_tech_db_response = await db
      .select()
      .from(otherTechResponses)
      .where(eq(otherTechResponses.personId, person.id))

    let otherTechnologies: formType["otherTechnologies"] = []
    if (other_tech_db_response.length !== 0) {
      otherTechnologies = other_tech_db_response
        .map((entry) => {
          return {
            id: entry.otherTechId,
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

    const cloud_db_response = await db
      .select()
      .from(cloudResponses)
      .where(eq(cloudResponses.personId, person.id))

    let clouds: formType["clouds"] = []
    if (cloud_db_response.length !== 0) {
      clouds = cloud_db_response
        .map((entry) => {
          return {
            id: entry.cloudId,
            rating: entry.rating,
            purpose: entry.purpose,
          }
        })
    }

    return {
      email: person.email,
      age: 18,
      gender: person.gender,
      skill: person.skill,
      occupation: person.occupation,
      oss: oss,
      editors: editors,
      languages: languages,
      webTechnologies: webTechnologies,
      appTechnologies: appTechnologies,
      otherTechnologies: otherTechnologies,
      clouds: clouds,
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
    const oss = await db.select().from(osChoices).where(eq(osChoices.verified, 1))
    const editors = await db.select().from(editorChoices).where(eq(editorChoices.verified, 1))
    const langs = await db.select().from(languageChoices).where(eq(languageChoices.verified, 1))
    const webtechs = await db.select().from(webTechChoices).where(eq(webTechChoices.verified, 1))
    const apptechs = await db.select().from(appTechChoices).where(eq(appTechChoices.verified, 1))
    const othertechs = await db.select().from(otherTechChoices).where(eq(otherTechChoices.verified, 1))
    const databases = await db.select().from(databaseChoices).where(eq(databaseChoices.verified, 1))
    const clouds = await db.select().from(cloudChoices).where(eq(cloudChoices.verified, 1))

    // Calculate largest 
    const largest_os = oss.reduce((prev, curr) => {
      return (prev && prev.id > curr.id) ? prev : curr
    }).id
    const largest_editor = editors.reduce((prev, curr) => {
      return (prev && prev.id > curr.id) ? prev : curr
    }).id
    const largest_lang = langs.reduce((prev, curr) => {
      return (prev && prev.id > curr.id) ? prev : curr
    }).id
    const largest_webtech = webtechs.reduce((prev, curr) => {
      return (prev && prev.id > curr.id) ? prev : curr
    }).id
    const largest_apptech = apptechs.reduce((prev, curr) => {
      return (prev && prev.id > curr.id) ? prev : curr
    }).id
    const largest_othertech = othertechs.reduce((prev, curr) => {
      return (prev && prev.id > curr.id) ? prev : curr
    }).id
    const largest_database = databases.reduce((prev, curr) => {
      return (prev && prev.id > curr.id) ? prev : curr
    }).id
    const largest_cloud = clouds.reduce((prev, curr) => {
      return (prev && prev.id > curr.id) ? prev : curr
    }).id

    // set name arrays
    let os_names: string[] = Array(largest_os+1)
    for (const os of oss) {
      os_names[os.id] = os.name
    }
    let editor_names: string[] = Array(largest_editor+1)
    for (const editor of editors) {
      editor_names[editor.id] = editor.name
    }
    let lang_names: string[] = Array(largest_lang+1)
    for (const lang of langs) {
      lang_names[lang.id] = lang.name
    }
    let webtech_names: string[] = Array(largest_webtech+1)
    for (const webf of webtechs) {
      webtech_names[webf.id] = webf.name
    }
    let apptech_names: string[] = Array(largest_apptech+1)
    for (const appf of apptechs) {
      apptech_names[appf.id] = appf.name
    }
    let othertech_names: string[] = Array(largest_othertech+1)
    for (const otherf of othertechs) {
      othertech_names[otherf.id] = otherf.name
    }
    let db_names: string[] = Array(largest_database+1)
    for (const db of databases) {
      db_names[db.id] = db.name
    }
    let cloud_names: string[] = Array(largest_cloud+1)
    for (const cloud of clouds) {
      cloud_names[cloud.id] = cloud.name
    }

    const os_ids = (oss.map((os) => os.id))
    const editor_ids = (editors.map((editor) => editor.id))
    const lang_ids = (langs.map((lang) => lang.id))  
    const webtech_ids = (webtechs.map((webf) => webf.id))
    const apptech_ids = (apptechs.map((appf) => appf.id))
    const othertech_ids = (othertechs.map((otherf) => otherf.id))
    const db_ids = (databases.map((db) => db.id))
    const cloud_ids = (clouds.map((cloud) => cloud.id))

    let prevData: Awaited<ReturnType<typeof get_submission>> | null = null
    if (prevFilledId !== null) {
      prevData = await get_submission(prevFilledId)
    }

    console.log("database query promise created.")
    return {
      options: {
        oss: {
          ids: os_ids.sort((a, b) => os_names[a].localeCompare(os_names[b])),
          names: os_names,
        },
        editors: {
          ids: editor_ids.sort((a, b) => editor_names[a].localeCompare(editor_names[b])),
          names: editor_names,
        },
        languages: {
          ids: lang_ids.sort((a, b) => lang_names[a].localeCompare(lang_names[b])),
          names: lang_names,
        },
        webTechnologies: {
          ids: webtech_ids.sort((a, b) => webtech_names[a].localeCompare(webtech_names[b])),
          names: webtech_names,
        },
        appTechnologies: {
          ids: apptech_ids.sort((a, b) => apptech_names[a].localeCompare(apptech_names[b])),
          names: apptech_names,
        },
        otherTechnologies: {
          ids: othertech_ids.sort((a, b) => othertech_names[a].localeCompare(othertech_names[b])),
          names: othertech_names,
        },
        databases: {
          ids: db_ids.sort((a, b) => db_names[a].localeCompare(db_names[b])),
          names: db_names,
        },
        clouds: {
          ids: cloud_ids.sort((a, b) => cloud_names[a].localeCompare(cloud_names[b])),
          names: cloud_names,
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
