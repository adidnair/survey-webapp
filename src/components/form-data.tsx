import { db } from "@/db/db";
import { languages, webFrameworks } from "../../drizzle/out/schema";

const getDbPromise = async () => {
  // Get data
  const langs = await db.select().from(languages).all()
  const webfs = await db.select().from(webFrameworks).all()

  // Calculate largest 
  const largest_lang = langs.reduce((prev, curr) => {
    return (prev && prev.id > curr.id) ? prev : curr
  }).id
  const largest_webf = webfs.reduce((prev, curr) => {
    return (prev && prev.id > curr.id) ? prev : curr
  }).id

  // set name arrays
  let lang_names: string[] = Array(largest_lang+1)
  for (const lang of langs) {
    lang_names[lang.id] = lang.name
  }
  let webf_names: string[] = Array(largest_webf+1)
  for (const webf of webfs) {
    webf_names[webf.id] = webf.name
  }

  const lang_ids = (langs.map((lang) => lang.id))  
  const webf_ids = (webfs.map((webf) => webf.id))

  console.log("database query promise created.")
  return {
    languages: {
      ids: lang_ids.sort((a, b) => lang_names[a].localeCompare(lang_names[b])),
      names: lang_names,
    },
    webFrameworks: {
      ids: webf_ids.sort((a, b) => webf_names[a].localeCompare(webf_names[b])),
      names: webf_names,
    },
  }
}

export const dbPromise = getDbPromise()

export type formType = {
  languages: {
      experience: number;
      recommendation: number;
      id: number;
  }[],
  email: string;
  age: number;
  sex: string;
  skill: string;
  webFrameworks: {
      id: number;
      experience: number;
      recommendation: number;
  }[];
}
