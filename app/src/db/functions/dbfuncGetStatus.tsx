import {statuses} from "../config/schema";
import db from "../config/drizzle";
import {StatusList} from "../../components/compMain";

export async function getStatuses(selector: string)
{
    console.log(`selector: ${selector}`);
    let results: {contents: string, user: string}[] = [{contents: "", user: ""}];
    let swap = {};
    if (selector == "any")
    {
        swap = {"hx-swap-oob" : "#statusList"};
        results = await db.select({contents: statuses.contents, user: statuses.user}).from(statuses);
    } else if (!selector) {
        console.log("No selector for getStatuses()");
        return;
    } else {
        results = await db.select({contents: statuses.contents, user: statuses.user}).from(statuses);
        let match: {contents: string, user: string}[] = [{contents: "", user: ""}];
        for (const row of results)
        {
            const values = Object.values(row);
            console.log(`values: ${values}`);
            if (values.find((element) => element == selector))
            {
                match.push(row);
            }
        }
        match.shift();
        results = match
    }
    return <StatusList results = {results} swap = {swap}></StatusList>;
}