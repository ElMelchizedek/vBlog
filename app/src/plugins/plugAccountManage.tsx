import { Elysia, t } from 'elysia';
import { Boilerplate, StatusList, AddStatus, } from "../components/compMain";

export const accountManage = (app: Elysia) => app
.get("/accountManage", () => {
    console.log("Hello, world!")
})