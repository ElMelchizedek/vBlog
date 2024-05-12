import { Elysia } from 'elysia'
import { html } from '@elysiajs/html'
import { addStatus, accountManage } from "./plugins/plugMain";
import { Landing } from './components/compMain';
import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager';

new Elysia()
    .use(html())
    .use(addStatus)
    .use(accountManage)
    .get('/', () =>
        <Landing />
    )
    .get("/assets/:file", ({params: {file}}) => Bun.file(`assets/${file}`))
    .listen(3000)