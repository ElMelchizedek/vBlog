import { ButtonAccountManage, ButtonAddStatus } from "./compUI"
import { getStatuses } from "../db/functions/dbfuncGetStatus"

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
        <div id="root">
            <div id="head">
                <h1>verlBlog</h1>
            </div>
            <div id="torso">
                {children}
            </div>
        </div>
        </body>
        </html>
    )
}

export function Landing()
{
    return (
        <Boilerplate>
            <>
                <div id="shoulders">
                    <ButtonAccountManage />
                    <ButtonAddStatus />
                </div>
                <div id="chest">
                    {getStatuses()}
                </div>
        	</>
        </Boilerplate>
    )
}