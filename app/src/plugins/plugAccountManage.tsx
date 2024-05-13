import { Elysia } from 'elysia';
import { Boilerplate, PanelAccountManage } from "../components/compMain";

export const accountManage = (app: Elysia) => app
.get("/accountManage", async ({headers, set, cookie: { login }}) => {
    if (headers["hx-request"]) return <PanelAccountManage token={login.value} />
    else return <Boilerplate><PanelAccountManage token={login.value}/></Boilerplate>
})