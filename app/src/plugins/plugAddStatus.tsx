import { Elysia, t } from 'elysia';
import { Boilerplate, ButtonAddStatus, FormAddStatus, PanelAccountManage } from "../components/compMain";
import { statuses } from "../db/config/schema";
import db from "../db/config/drizzle";
import { getStatuses, getAccount } from "../db/functions/dbfuncMain";

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
                if (body.addStatusFormContentsText == "")
                {
                    return <FormAddStatus />
                } else {
                    await db.insert(statuses).values({
                        user: name,
                        contents: body.addStatusFormContentsText,
                    });
                }
                return <>
                    {getStatuses("any")}
                    <ButtonAddStatus />
                </>;
            } else {
                return <PanelAccountManage token={login.value} />
            }
        },
        {
            body: t.Object({
                addStatusFormContentsText: t.String()
            })
        }
    )