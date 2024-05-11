import {Elysia, t} from 'elysia';
import {Boilerplate, StatusList, AddStatus,} from "../components/compMain";
import { getStatuses } from '../db/functions/dbfuncGetStatus';
import {statuses} from "../db/config/schema";
import db from "../db/config/drizzle";

export const addStatus = (app: Elysia) => app
    .get("/addStatus", ({headers}) => {
        const addStatusForm =
            <form hx-post="/addStatus" id="addStatusForm">
                <div class="centeredDiv">
                    <div class="centeredDiv">
                        <textarea rows="5" cols="30" name="addStatusFormContentsText">Write something here!</textarea>
                    </div>
                    <br/>
                    <div class="centeredDiv">
                        <input type="submit" value="Submit"></input>
                    </div>
                </div>
            </form>
        if (headers["hx-request"]) return addStatusForm;
        else return <Boilerplate>{addStatusForm}</Boilerplate>;
    })
    .post("/addStatus", async ({body}) => {
            await db.insert(statuses).values({
                user: "test",
                contents: body.addStatusFormContentsText,
            });

            const results = await db.select({contents: statuses.contents, user: statuses.user}).from(statuses);

            return <>
                {getStatuses} 
                <AddStatus />
            </>;
        },
        {
            body: t.Object({
                addStatusFormContentsText: t.String()
            })
        }
    )