import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Client } from "pg";
import { getDatabaseCreds } from './secret';

const client = new Client(
   await getDatabaseCreds()
)

await client.connect();
const db = drizzle(client);
export default db;