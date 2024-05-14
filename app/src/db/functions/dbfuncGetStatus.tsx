import {statuses} from "../config/schema";
import db from "../config/drizzle";
import {StatusList} from "../../components/compMain";

export async function getStatuses(selector: string | null, onAccountPage: boolean)
{
    let results: {contents: string, user: string, id: number}[] = [{contents: "", user: "", id: 0}];
    let swap = {};
    if (selector == "any")
    {
        swap = {"hx-swap-oob" : "#statusList"};
        results = await db.select({contents: statuses.contents, user: statuses.user, id: statuses.id}).from(statuses);
    } else if (!selector) {
        console.log("No selector for getStatuses()");
        return;
    } else {
        results = await db.select({contents: statuses.contents, user: statuses.user, id: statuses.id}).from(statuses);
        let match: {contents: string, user: string, id: number }[] = [{contents: "", user: "", id: 0}];
        for (const row of results)
        {
            const values = Object.values(row);
            if (values.find((element) => element == selector))
            {
                match.push(row);
            }
        }
        match.shift();
        results = match
    }
    return <StatusList results = {results} onAccountPage = {onAccountPage} swap = {swap}></StatusList>;
}