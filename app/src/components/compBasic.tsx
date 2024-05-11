import { AccountManage, AddStatus } from "./compUI"

export function Boilerplate({children}: { children: JSX.Element })
{
    return (
        <html lang='en'>
        <head>
            <title>verlBlog</title>
            <script src="https://unpkg.com/htmx.org@1.9.12"></script>
            <link href="/assets/style.css" rel="stylesheet"/>
        </head>
        <body>
        <div class="centeredDiv">
            <h1>verlBlog</h1>
        </div>
        {children}
        </body>
        </html>
    )
}

export function Landing()
{
    return (
        <Boilerplate>
            <>
                <AccountManage />
                <br />
                <AddStatus />
                <div id="statusList"></div>
        	</>
        </Boilerplate>
    )
}