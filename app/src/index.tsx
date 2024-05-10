import { Elysia, t } from 'elysia'
import { html } from '@elysiajs/html'
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as pg from "drizzle-orm/pg-core";
import db from "../db/drizzle";
import { statuses } from "../db/schema";


function Boilerplate({ children }: { children: JSX.Element})
{
    return (
        <html lang='en'>
            <head>
                <title>verlBlog</title>
                <script src="https://unpkg.com/htmx.org@1.9.12"></script>
                <link href="/assets/style.css" rel="stylesheet" />
            </head>
            <body>
                <div class="headerTitle">
                    <h1>verlBlog</h1>
                </div>
                {children}
            </body>
        </html>
    )
}

function StatusList({ results }: {results: {contents: string}[]}) 
{
    return (
        <div id="statusList" hx-swap-oob="#statusList">
            {results.map(({contents}) => 
                <div class="statusItem">
                    <p>{contents}</p>
                </div>
            )}
        </div>
    )
};

new Elysia()
    .use(html())
    .get('/', () =>
        <Boilerplate>
            <>
                <div class="newStatusButton">
                    <button hx-get="/addStatus" hx-swap="outerHTML" id="newStatusButton">New Status</button>
                </div>
                <div id="statusList"></div>
            </>
        </Boilerplate>
    )
    .get("/addStatus", ({headers}) => {
        const addStatusForm = 
                <form hx-post="/addStatus" id="addStatusForm">
                  <div class="addStatusFormDiv">
                    <div class="addStatusFormText">
                        <textarea rows="5" cols="30" name="postBoxText">Write something here!</textarea>
                    </div>
                    <br />
                    <div class="addStatusFormButton">
                        <input type="submit" value="Submit"></input>
                    </div>
                  </div>
                </form>
        if( headers["hx-request"] ) return addStatusForm;
        else return <Boilerplate>{ addStatusForm }</Boilerplate>;
    })
    .post("/addStatus", async ({body}) => {
        await db.insert(statuses).values({
            contents: body.postBoxText
        });

        const results = await db.select({contents: statuses.contents}).from(statuses);

        const statusListAndButton = 
        <>
            <StatusList results={results}></StatusList>
            <button hx-get="/addStatus" hx-swap="outerHTML" id="newStatusButton">New Status</button>
        </>

        return statusListAndButton;
    },
    {
        body: t.Object({
            postBoxText: t.String()
        })
    })
    .get("/assets/:file", ({params: {file}}) => Bun.file(`assets/${file}`))
    .listen(3000)