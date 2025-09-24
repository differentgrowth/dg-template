import type { Config } from "payload";

import { vercelPostgresAdapter } from "@payloadcms/db-vercel-postgres";

export const db: NonNullable<Config["db"]> = vercelPostgresAdapter({
  pool: {
    connectionString: process.env.DATABASE_URI,
  },
  push: process.env.NODE_ENV !== "production",
});
