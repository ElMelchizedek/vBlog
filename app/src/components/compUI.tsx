export function ButtonAddStatus()
{
    return (
        <button hx-get="/addStatus" hx-swap="outerHTML" id="newStatusButton" class="button">New Status</button>
    )
}

export function ButtonAccountManage()
{
    return (
        <button hx-get="/accountManage" hx-target="#torso" hx-swap="innerHTML" id="accountManageButton" class="button">Manage Account</button>
    )
}

export function ButtonAccountLoginRegister()
{
    return (
        <button hx-get="/registerLogin" hx-swap="outerHTML" id="loginRegisterButton" class="button">Login / Register</button>
    )
}

export function ButtonAccountReturnLanding()
{
    return (
        <a href="/" id="returnLanding" class="button">Return</a>
    )
}