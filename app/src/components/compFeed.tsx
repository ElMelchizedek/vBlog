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
        <div id="boxAddStatusForm">
            <form hx-post="/addStatus" id="addStatusForm">
                <textarea rows="5" cols="30" name="addStatusFormContentsText">Write something here!</textarea>
                <br/>
                <input type="submit" value="Submit"></input>
            </form>
        </div>
    );
}