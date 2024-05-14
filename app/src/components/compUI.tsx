export function ButtonAddStatus()
{
    return (
        <button hx-get="/addStatus" hx-swap="outerHTML" id="newStatusButton" class="button">Post</button>
    )
}

export function ButtonAccountManage()
{
    return (
        <button hx-get="/accountManage" hx-target="#torso" hx-swap="innerHTML" id="accountManageButton" class="button">Account</button>
    )
}

export function ButtonAccountLogin()
{
    return (
        <button hx-get="/loginForm" hx-target="#torso" hx-swap="innerHTML" id="loginButton" class="button">Login</button>
    )
}

export function ButtonAccountReturnLanding()
{
    return (
        <a href="/" id="returnLanding" class="button">Return</a>
    )
}

export function ButtonDeleteStatus({onAccountPage, id} : {onAccountPage : boolean, id : number})
{
    let html : JSX.Element = "";
    if (onAccountPage) { html = <button hx-get={`/deleteStatus?name=${id}`} hx-swap="outerHTML" hx-target={`#status${id}`} id="deleteStatusButton" class="button">Delete</button> }
    return ( html )
}