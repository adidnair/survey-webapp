"use server";
import { db } from "@/db/db";
import { formType } from "./form-data";
import { languageResponses, webTechResponses, people, databaseResponses, appTechResponses, otherTechResponses, cloudResponses, editorResponses, osResponses } from "../../drizzle/out/schema";
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

      if (values.oss.length !== 0) {
        await db.insert(osResponses).values(
          values.oss.map((entry) => {
            return {
              personId: id,
              osId: entry.id,
              rating: entry.rating,
              purpose: entry.purpose,
            };
          }),
        );
      }

      if (values.editors.length !== 0) {
        await db.insert(editorResponses).values(
          values.editors.map((entry) => {
            return {
              personId: id,
              editorId: entry.id,
              rating: entry.rating,
              purpose: entry.purpose,
            };
          }),
        );
      }

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

      if (values.webTechnologies.length !== 0) {
        await db.insert(webTechResponses).values(
          values.webTechnologies.map((entry) => {
            return {
              personId: id,
              webTechId: entry.id,
              proficiency: entry.proficiency,
              likeability: entry.recommendation,
              purpose: entry.purpose,
            };
          }),
        );
      }

      if (values.appTechnologies.length !== 0) {
        await db.insert(appTechResponses).values(
          values.appTechnologies.map((entry) => {
            return {
              personId: id,
              appTechId: entry.id,
              proficiency: entry.proficiency,
              likeability: entry.recommendation,
              purpose: entry.purpose,
            };
          }),
        );
      }

      if (values.otherTechnologies.length !== 0) {
        await db.insert(otherTechResponses).values(
          values.otherTechnologies.map((entry) => {
            return {
              personId: id,
              otherTechId: entry.id,
              proficiency: entry.proficiency,
              likeability: entry.recommendation,
              purpose: entry.purpose,
            };
          }),
        );
      }

      if (values.databases.length !== 0) {
        await db.insert(databaseResponses).values(
          values.databases.map((entry) => {
            return {
              personId: id,
              databaseId: entry.id,
              proficiency: entry.proficiency,
              likeability: entry.recommendation,
              purpose: entry.purpose,
            };
          }),
        );
      }

      if (values.clouds.length !== 0) {
        await db.insert(cloudResponses).values(
          values.clouds.map((entry) => {
            return {
              personId: id,
              cloudId: entry.id,
              rating: entry.rating,
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

        if (values.oss.length !== 0) {
          await db.insert(osResponses).values(
            values.oss.map((entry) => {
              return {
                personId: new_row[0].id,
                osId: entry.id,
                rating: entry.rating,
                purpose: entry.purpose,
              };
            }),
          );
        }

        if (values.editors.length !== 0) {
          await db.insert(editorResponses).values(
            values.editors.map((entry) => {
              return {
                personId: new_row[0].id,
                editorId: entry.id,
                rating: entry.rating,
                purpose: entry.purpose,
              };
            }),
          );
        }

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

        if (values.webTechnologies.length !== 0) {
          await db.insert(webTechResponses).values(
            values.webTechnologies.map((entry) => {
              return {
                personId: new_row[0].id,
                webTechId: entry.id,
                proficiency: entry.proficiency,
                likeability: entry.recommendation,
                purpose: entry.purpose,
              };
            }),
          );
        }

        if (values.appTechnologies.length !== 0) {
          await db.insert(appTechResponses).values(
            values.appTechnologies.map((entry) => {
              return {
                personId: new_row[0].id,
                appTechId: entry.id,
                proficiency: entry.proficiency,
                likeability: entry.recommendation,
                purpose: entry.purpose,
              };
            }),
          );
        }

        if (values.otherTechnologies.length !== 0) {
          await db.insert(otherTechResponses).values(
            values.otherTechnologies.map((entry) => {
              return {
                personId: new_row[0].id,
                otherTechId: entry.id,
                proficiency: entry.proficiency,
                likeability: entry.recommendation,
                purpose: entry.purpose,
              };
            }),
          );
        }

        if (values.databases.length !== 0) {
          await db.insert(databaseResponses).values(
            values.databases.map((entry) => {
              return {
                personId: new_row[0].id,
                databaseId: entry.id,
                proficiency: entry.proficiency,
                likeability: entry.recommendation,
                purpose: entry.purpose,
              };
            }),
          );
        }

        if (values.clouds.length !== 0) {
          await db.insert(cloudResponses).values(
            values.clouds.map((entry) => {
              return {
                personId: new_row[0].id,
                cloudId: entry.id,
                rating: entry.rating,
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
