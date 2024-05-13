import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from "pg";
import { getDBSecret } from './secret';

const client = new Client(
   await getDBSecret()
);

await client.connect();
const db = drizzle(client);
export default db;