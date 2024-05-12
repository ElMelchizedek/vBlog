import { Elysia, t } from 'elysia';
import { Boilerplate, StatusList, ButtonAddStatus, PanelAccountManage } from "../components/compMain";

export const accountManage = (app: Elysia) => app
.get("/accountManage", () => {
    return (
        <PanelAccountManage />
    )
})