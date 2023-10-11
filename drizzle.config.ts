import type { Config } from "drizzle-kit"
import { env, cwd } from "process"
import { loadEnvConfig } from "@next/env"

loadEnvConfig(cwd())

export default {
    driver: "turso",
    schema: "./src/schema/*.ts",
    dbCredentials: {
        url: env.DATABASE_URL ? env.DATABASE_URL : "",
        authToken: env.DATABASE_AUTH_TOKEN,
    }
} satisfies Config
