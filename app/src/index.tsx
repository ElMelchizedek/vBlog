import { Elysia } from 'elysia'
import { html } from '@elysiajs/html'
import { addStatus, accountManage, loginForm } from "./plugins/plugMain";
import { Landing } from './components/compMain';

new Elysia()
    .use(html())
    .use(addStatus)
    .use(accountManage)
    .use(loginForm)
    .get('/', () =>
        <Landing />
    )
    .get("/assets/:file", ({params: {file}}) => Bun.file(`assets/${file}`))
    .listen(3000)