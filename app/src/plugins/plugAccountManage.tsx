import { Elysia } from 'elysia';
import { Boilerplate, PanelAccountManage } from "../components/compMain";
import { jwt } from "@elysiajs/jwt";

export const accountManage = (app: Elysia) => app
.use(
    jwt({
        name: "accountManage",
        secret: "mangudai"
    })
)
.get("/accountManage", async ({headers, set, cookie: { login }, accountManage}) => {
    // await login.set({
    //     value: await accountManage.sign({iss: "verlBlog", sub:"admin"})
    // })
    if (headers["hx-request"]) return <PanelAccountManage token={login.value} />
    else return <Boilerplate><PanelAccountManage token={login.value}/></Boilerplate>
})