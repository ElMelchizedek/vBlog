import { Elysia, t } from 'elysia';
import { Boilerplate, ButtonAddStatus, FormAddStatus } from "../components/compMain";
import { getStatuses } from '../db/functions/dbfuncGetStatus';
import { statuses } from "../db/config/schema";
import db from "../db/config/drizzle";

export const addStatus = (app: Elysia) => app
    .get("/addStatus", ({headers}) => {
        if (headers["hx-request"]) return <FormAddStatus />
        else return <Boilerplate><FormAddStatus /></Boilerplate>;
    })
    .post("/addStatus", async ({body}) => {
            await db.insert(statuses).values({
                user: "test",
                contents: body.addStatusFormContentsText,
            });

            return <>
                {getStatuses()}
                <ButtonAddStatus />
            </>;
        },
        {
            body: t.Object({
                addStatusFormContentsText: t.String()
            })
        }
    )