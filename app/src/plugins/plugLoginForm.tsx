import { Elysia, t } from 'elysia';
import { Boilerplate, PanelAccountManage, PanelLogin } from "../components/compMain";
import { jwt } from "@elysiajs/jwt";
import { getAccount } from '../db/functions/dbfuncMain';
import { getJWTSecret } from '../db/config/secret';

const secret = await getJWTSecret();

export const loginForm = (app: Elysia) => app
.use(
    jwt({
        name: "checker",
        secret: secret 
    })
)
.get("/loginForm", async ({headers}) => {
    if (headers["hx-request"]) return <PanelLogin />
    else return <Boilerplate><PanelLogin /></Boilerplate>
})
.post("/loginForm", async ({body, checker, set, headers, cookie: {login}}) => {
        const value = (body.loginFormUserText + body.loginFormPassText);
        const dummy = await checker.sign({iss: "verlBlog", sub: value});
        const entry = await checker.verify(dummy);
        if (!entry)
        {
            console.log("JWT Token failed to verify");
        }
        else 
        {
            const creds = await getAccount(dummy);
            if (creds == null) { 
               return ( 
                <Boilerplate>
                    <PanelLogin />
                </Boilerplate>
                )
            }
            else {
                if (!login.value)
                {
                    const newCookie: string = ("login=" + dummy);
                    set.headers["Set-Cookie"] = (newCookie);
                } else {
                    login.set({
                        value: dummy
                    });
                }
                return <Boilerplate><PanelAccountManage token={dummy} /></Boilerplate>
            }
        }
    },
    {
        body: t.Object({
            loginFormUserText: t.String(),
            loginFormPassText: t.String()
        })
    }
)
