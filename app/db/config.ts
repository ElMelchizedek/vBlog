import "dotenv/config";
import type { Config } from "drizzle-kit"

export default
{
    schema: "./db/schema.ts",
    out: "./drizzle",
    driver: "pg",
    dbCredentials: {
        host: process.env.DB_HOST || "",
        port: parseInt(process.env.DB_PORT || "5432"),
        database: process.env.DB_DATABASE || "",
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    }
} satisfies Config;
