import * as pg from "drizzle-orm/pg-core";

export const statuses = pg.pgTable("statuses", {
    id: pg.serial("id").primaryKey(),
    contents: pg.text("contents").notNull(),
});