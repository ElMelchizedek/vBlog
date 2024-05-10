import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Client } from "pg";

const client = new Client({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
})

await client.connect();
const db = drizzle(client);
export default db;