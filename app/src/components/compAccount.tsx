export function AccountDetails({user, name} : {user: string, name: string})
{
    return ( 
        <div id="accountDetails" class="statusItem">
            <p>Username: {user}</p>
            <p>Display name: {name}</p>
        </div>
    )
}

export function PanelAccountManage() 
{
    return (
        <div id ="panelAccountManage" class="centeredDiv">
            <AccountDetails user="test" name="test" />
        </div>
    )
}