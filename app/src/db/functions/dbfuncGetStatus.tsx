import {statuses} from "../config/schema";
import db from "../config/drizzle";
import {StatusList} from "../../components/compMain";

export async function getStatuses()
{
    const results = await db.select({contents: statuses.contents, user: statuses.user}).from(statuses);

    return <StatusList results = {results}></StatusList>;
}