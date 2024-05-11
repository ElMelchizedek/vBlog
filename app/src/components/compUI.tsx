export function AddStatus()
{
    return (
        <div class="centeredDiv">
            <button hx-get="/addStatus" hx-swap="outerHTML" id="newStatusButton">New Status</button>
        </div>
    )
}

export function AccountManage()
{
    return (
        <div class="centeredDiv">
            <button hx-get="/accountManage" hx-swap="outerHTML" id="accountManageButton">Manage Account</button>
        </div>
    )
}