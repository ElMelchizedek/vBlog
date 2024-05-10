import { Elysia, t } from 'elysia'
import { html } from '@elysiajs/html'
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as pg from "drizzle-orm/pg-core";
import db from "../db/drizzle";
import { statuses } from "../db/schema";

new Elysia()
    .use(html())
    .get('/', () => (
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
                <form hx-post="/submit" hx-target="#statusList" hx-swap="beforeend" id="postForm" >
                  <div class="postBox">
                    <div class="postBoxText">
                        <textarea rows="5" cols="30" name="postBoxText">Write something here!</textarea>
                    </div>
                    <br />
                    <div class="postBoxButton">
                        <input type="submit" value="Submit"></input>
                    </div>
                  </div>
                </form>
                <br />
                <hr />
            </body>
        </html>
    ))
    .post("/submit", async ({body}) => {
        await db.insert(statuses).values({
            contents: body.postBoxText 
        });
        const result = await db.select().from(statuses);
    },
    {
        body: t.Object({
            postBoxText: t.String()
        })
    })
    .get("/assets/:file", ({params: {file}}) => Bun.file(`assets/${file}`))
    .get('/some-page-your-htmx-wants', ({headers}) => console.log(headers))
    .listen(3000)