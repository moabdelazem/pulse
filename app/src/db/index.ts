import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";
import config from "../config/config";

export const pool = new Pool({
  connectionString: config.databaseUrl!,
});

export const db = drizzle({ client: pool, schema });
