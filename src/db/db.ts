import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { env } from "process"

if (!env.DATABASE_URL) throw new Error("DATABASE_URL is empty")
const client = createClient({ url: env.DATABASE_URL, authToken: env.DATABASE_AUTH_TOKEN });
 
export const db = drizzle(client);
