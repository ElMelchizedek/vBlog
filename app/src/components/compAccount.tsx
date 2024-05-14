import { Boilerplate, ButtonAccountLogin, ButtonAccountReturnLanding, StatusList } from "./compMain"
import { getAccount, getStatuses, getUser } from "../db/functions/dbfuncMain";

export function AccountDetails({response} : {response: Array<string> | null })
{
    if (response == null)
    {
        return (
            <div id="accountDetails">
                <p>You have either not logged in previously or your token has corrupted. Please do so now.</p>
            </div>
        )
    }
    else {
        const [token, user, name] = response as Array<string>;
        return (
        <div id="accountDetails">
            <p>Username: {user}</p>
            <p>Display name: {name}</p>
            <p>Login token: {token}</p>
        </div>
        )
    }
}

export async function PanelAccountManage({token} : {token: string}) 
{
    let dbResponse = await getAccount(token);
    const username = await getUser(token);
    if (!username)
    {
        console.log("Failed to get username when building user page statusList");
        dbResponse = null;
    }
    return (
        <>
            <div id="panelAccountManage">
                <AccountDetails response={dbResponse} />
                <div id="buttonsAccount">
                    <ButtonAccountLogin />
                    <ButtonAccountReturnLanding />
                </div>
            </div>
            {await getStatuses(username, true)}
        </>
    )
}

export function PanelLogin()
{
    return (
        <form hx-post="/loginForm" id="loginForm" hx-swap="outerHTML" hx-target="#root">
            <label for="loginFormUserText">User:</label><br />
            <input name="loginFormUserText" id="loginFormUserText"></input><br />
            <label for="loginFormPassText">Pass:</label><br />
            <input type="password" name="loginFormPassText" id="loginFormPassText"></input><br />
            <button id="buttonSubmitForm" class="button">Login</button><br />
        </form>
    )

}