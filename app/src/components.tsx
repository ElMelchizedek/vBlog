// JSX components

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

export function StatusList({results}: { results: { contents: string, user: string }[] })
{
    return (
        <div id="statusList" hx-swap-oob="#statusList">
            {results.map(({contents, user}) =>
                <div class="statusItem">
                    <p>{contents}</p>
                    <b><p>{user}</p></b>
                </div>
            )}
        </div>
    )
}

export function AddStatus()
{
    return (
        <div class="centeredDiv">
            <button hx-get="/addStatus" hx-swap="outerHTML" id="newStatusButton">New Status</button>
        </div>
    )
}

export function AccountManage()
{
    return (
        <div class="centeredDiv">
            <button hx-get="/accountManage" hx-swap="outerHTML" id="accountManageButton">Manage Account</button>
        </div>
    )
}