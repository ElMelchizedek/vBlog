import {statuses} from "../config/schema";
import db from "../config/drizzle";
import {StatusList} from "../../components/compMain";

export async function getStatuses(selector: string)
{
    let results: {contents: string, user: string}[] = [{contents: "", user: ""}];
    if (selector == "any")
    {
        results = await db.select({contents: statuses.contents, user: statuses.user}).from(statuses);
    } else if (!selector) {
        console.log("No selector for getStatuses()");
        return;
    } else {
        results = await db.select({contents: statuses.contents, user: statuses.user}).from(statuses);
        let match: {contents: string, user: string}[] = [{contents: "", user: ""}];
        for (const row of results)
        {
            const keys = Object.keys(row);
            if (keys.find((element) => element == selector))
            {
                match.push(row);
            }
        }
    }
    return <StatusList results = {results}></StatusList>;
}