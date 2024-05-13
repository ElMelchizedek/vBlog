export function StatusList({results}: { results: { contents: string, user: string }[] })
{
    return (
        <div id="statusList" hx-swap-oob="#statusList">
            {results.map(({contents, user}) =>
                <div class="statusItem">
                    <p>{contents}</p>
                    <b><p>{user}</p></b>
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