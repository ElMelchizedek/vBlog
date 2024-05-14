import { Elysia, t } from 'elysia';
import { Boilerplate, PanelAccountManage, StatusList } from "../components/compMain";
import { getStatuses } from '../db/functions/dbfuncMain';

export const userPage = (app: Elysia) => app
.get("/user", ({query}) => {
    return (
        <Boilerplate>
            <>
            {getStatuses(query.name, true)}
            </>
        </Boilerplate>
    )
}, 
{
    query: t.Object({
        name: t.String()
    })
})