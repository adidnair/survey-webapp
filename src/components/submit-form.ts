"use server";
import { db } from "@/db/db";
import { formType } from "./form-data";
import { languageResponses, people } from "../../drizzle/out/schema";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";

export const checkIfFilled = async (email: string) => {
  try {
    const isAlreadyFilled = await db
      .select({ id: people.id })
      .from(people)
      .where(eq(people.email, email))
      .limit(1);
    switch (isAlreadyFilled.length) {
      // already filled
      case 1:
        return isAlreadyFilled[0].id;
      // ok
      case 0:
        return null;
      // ??
      default:
        console.log(
          `Error: more than one entry for email ${email}.\nThis should not happen.`,
        );
        return -1;
    }
  } catch (error) {
    console.log("Error: error occurred while checking db");
    console.log(error)
    return -1;
  }
};

export const pushToDB = async (values: formType, id: number | null) => {
  try {
    if (values.email === "") {
      values.email = null
    }
    if (id !== null) {
      const prev_data = await db
        .delete(people)
        .where(eq(people.id, id))
        .returning();

      await db.insert(people).values({
        id: id,
        generatedId: prev_data[0].generatedId,
        email: values.email,
        gender: values.gender,
        skill: values.skill,
      });

      if (values.languages.length !== 0) {
        await db.insert(languageResponses).values(
          values.languages.map((entry) => {
            return {
              personId: id,
              languageId: entry.id,
              proficiency: entry.proficiency,
              likeability: entry.recommendation,
              purpose: entry.purpose,
            };
          }),
        );
      }

      return prev_data[0].generatedId;
    } else {
      let gen_id = randomUUID().toString();

      outer: while (true) {
        const alreadyExists = await db
          .select({ id: people.id })
          .from(people)
          .where(eq(people.generatedId, gen_id));

        switch (alreadyExists.length) {
          case 1:
            gen_id = randomUUID().toString();
            break;
          case 0:
            break outer;
          default:
            console.log(
              `Error: more than one entry for uuid ${gen_id}.\nThis should not happen.`,
            );
            return -1;
        }
      }

      const new_row = await db
        .insert(people)
        .values({
          generatedId: gen_id,
          email: values.email,
          gender: values.gender,
          skill: values.skill,
        })
        .returning();

        if (values.languages.length !== 0) {
          await db.insert(languageResponses).values(
            values.languages.map((entry) => {
              return {
                personId: new_row[0].id,
                languageId: entry.id,
                proficiency: entry.proficiency,
                likeability: entry.recommendation,
                purpose: entry.purpose,
              };
            }),
          );
        }

      return gen_id;
    }
  } catch (error) {
    console.log("Error: error occurred while pushing form data");
    console.log(values)
    console.log(error)
    return -1;
  }
};
