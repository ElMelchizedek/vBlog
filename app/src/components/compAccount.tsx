import { ButtonAccountLoginRegister, ButtonAccountReturnLanding } from "./compUI"

export function AccountDetails({user, name} : {user: string, name: string})
{
    return ( 
        <div id="accountDetails">
            <p>Username: {user}</p>
            <p>Display name: {name}</p>
        </div>
    )
}

export function PanelAccountManage() 
{
    return (
        <div id="panelAccountManage">
            <AccountDetails user="test" name="test" />
            <div id="buttonsAccount">
                <ButtonAccountLoginRegister />
                <ButtonAccountReturnLanding />
            </div>
        </div>
    )
}