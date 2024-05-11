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
