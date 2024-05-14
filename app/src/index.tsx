import { Elysia } from 'elysia'
import { html } from '@elysiajs/html'
import { addStatus, accountManage, loginForm, userPage } from "./plugins/plugMain";
import { Landing } from './components/compMain';

new Elysia()
    .use(html())
    .use(addStatus)
    .use(accountManage)
    .use(loginForm)
    .use(userPage)
    .get('/', () => 
        <Landing />
    )
    .get("/assets/:file", ({params: {file}}) => Bun.file(`assets/${file}`))
    .listen(3000)