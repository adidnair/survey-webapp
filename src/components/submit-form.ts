"use server"
import { db } from "@/db/db";
import { formType } from "./form-data";
import { people } from "../../drizzle/out/schema";

const pushToDB = async (values: formType) => {
    const push = db.insert(people).values({
      generatedId: "aaa",
      email: values.email,
      sex: values.gender,
      skill: values.skill
    }).run()
    return "haha"
}

export { pushToDB }
