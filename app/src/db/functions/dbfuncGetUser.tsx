import { accounts } from "../config/schema";
import db from "../config/drizzle";

export async function getUser(argToken: string)
{
    const result = await db.select({token: accounts.token, user: accounts.user, name: accounts.name}).from(accounts)

    let match: string | null = null;
    for (const row of result)
    {
        const values = Object.values(row);
        if (values.find((element) => element == argToken)) { 
            match = row.user;
        }
    }

    return (match);
}