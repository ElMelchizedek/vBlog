import { Elysia, t} from "elysia";
import {dbDeleteStatus} from "../db/functions/dbfuncMain";

export const getDeleteStatus = (app: Elysia) => app
.get("/deleteStatus", async ({query, headers, set}) => {
    await dbDeleteStatus(parseFloat(query.name));
},
{
    query: t.Object({
        name: t.String()
    })
})