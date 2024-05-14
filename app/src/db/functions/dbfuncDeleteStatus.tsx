import {statuses} from "../config/schema";
import db from "../config/drizzle";
import { eq } from "drizzle-orm";

export async function dbDeleteStatus(id: number)
{
   await db.delete(statuses).where(eq(statuses.id, id));
}