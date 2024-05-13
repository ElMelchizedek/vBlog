import { accounts } from "../config/schema";
import db from "../config/drizzle";

export async function getAccount(argToken : string)
{
    const result = await db.select({token: accounts.token, user: accounts.user, name: accounts.name}).from(accounts)
    result[0].user

    let match: Array<string> | null = null;
    for (const row of result)
    {
        const values = Object.values(row);
        if (values.find((element) => element == argToken)) { 
            match = values;
        }
    }

    return (match);
}