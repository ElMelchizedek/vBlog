import {Elysia, t} from 'elysia'
import {html} from '@elysiajs/html'
import db from "../db/drizzle";
import {statuses} from "../db/schema";
import {Boilerplate, StatusList, AddStatus, AccountManage} from "./components";
import {addStatus} from "./plugins/addStatus";

new Elysia()
    .use(html())
    .use(addStatus)
    .get('/', () =>
        <Boilerplate>
            <>
                <AccountManage />
                <br />
                <AddStatus />
                <div id="statusList"></div>
        	</>
        </Boilerplate>
    )
    .get("/assets/:file", ({params: {file}}) => Bun.file(`assets/${file}`))
    .listen(3000)