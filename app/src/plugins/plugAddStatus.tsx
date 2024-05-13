import { Elysia, t } from 'elysia';
import { Boilerplate, ButtonAddStatus, FormAddStatus } from "../components/compMain";
import { getStatuses } from '../db/functions/dbfuncGetStatus';
import { statuses } from "../db/config/schema";
import db from "../db/config/drizzle";
import { getAccount } from '../db/functions/dbfuncGetAccount';

export const addStatus = (app: Elysia) => app
    .get("/addStatus", ({headers}) => {
        if (headers["hx-request"]) return <FormAddStatus />
        else return <Boilerplate><FormAddStatus /></Boilerplate>;
    })
    .post("/addStatus", async ({body, cookie: {login}}) => {
            const userCreds: Array<string> | null = await getAccount(login.value);
            if (userCreds)
            {
                const [token, user, name] = userCreds;
                await db.insert(statuses).values({
                    user: name,
                    contents: body.addStatusFormContentsText,
                });

                return <>
                    {getStatuses()}
                    <ButtonAddStatus />
                </>;
            }
        },
        {
            body: t.Object({
                addStatusFormContentsText: t.String()
            })
        }
    )