import { ButtonDeleteStatus } from "./compUI";

export function StatusList({results, onAccountPage, swap} : { results : { contents: string, user: string, id: number }[], onAccountPage : boolean, swap : object })
{
    return (
        <div id="statusList" {...swap}>
            {results.map(({contents, user, id}) =>
                <div class="statusItem" id={`status${id}`}>
                    <p>{contents}</p>
                    <a href={"/user?name=" + user}><b><p>{user}</p></b></a>
                    <ButtonDeleteStatus onAccountPage={onAccountPage} id={id} />
                </div>
            )}
        </div>
    )
}

export function FormAddStatus()
{
    return (
        <form hx-post="/addStatus" id="addStatusForm" hx-swap="outerHTML">
            <textarea rows="5" cols="30" name="addStatusFormContentsText"></textarea>
            <br/>
            <button id="buttonSubmitForm" class="button">Submit</button>
        </form>
    );
}