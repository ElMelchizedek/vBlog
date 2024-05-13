import * as pg from "drizzle-orm/pg-core";

export const statuses = pg.pgTable("statuses", {
    id: pg.serial("id").primaryKey().notNull(),
    user: pg.text("user").notNull(),
    contents: pg.text("contents").notNull(),
});

export const accounts = pg.pgTable("accounts", {
    token: pg.text("token").primaryKey().notNull(),
    user: pg.text("user").notNull(),
    name: pg.text("name").notNull(),
})