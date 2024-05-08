import { Elysia, t } from 'elysia'
import { html } from '@elysiajs/html'


new Elysia()
    .use(html())
    .get('/jsx', () => (
        <html lang='en'>
            <head>
                <title>verlBlog</title>
                <script src="https://unpkg.com/htmx.org@1.9.12"></script>
                {/* <link href="http://localhost:3000/assets/style.css" rel="stylesheet" /> */}
            </head>
            <body>
                <div class="headerTitle">
                    <h1>verlBlog</h1>
                </div>
                <div id="statusList" />

                <hr />
                <div class="postsContainer"></div>
                <form hx-post="/submit" hx-target="#statusList" hx-swap="beforeend" id="postForm" >
                  <div class="postBox">
                    <textarea class="postBoxText" rows="5" cols="30" name="postBoxText">Write something here!</textarea>
                    <br />
                    <input type="submit" class="postBoxButton" value="Submit"></input>
                  </div>
                </form>
            </body>
        </html>
    ))
    // .post("/submit", ({body}) => {
    //     return <div class="status"><p>{body.postBoxText}</p></div>
    // },
    // {
    //     body: t.Object({
    //         postBoxText: t.String()
    //     })

    // })
    // .get("/assets/:file", ({params: {file}}) => Bun.file(`assets/${file}`))
    .listen(3000)