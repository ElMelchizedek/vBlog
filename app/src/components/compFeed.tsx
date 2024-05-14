export function StatusList({results, swap} : { results : { contents: string, user: string }[], swap : object })
{
    return (
        <div id="statusList" {...swap}>
            {results.map(({contents, user}) =>
                <div class="statusItem">
                    <p>{contents}</p>
                    <a href={"/user?name=" + user}><b><p>{user}</p></b></a>
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