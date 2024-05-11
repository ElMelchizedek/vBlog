import * as pg from "drizzle-orm/pg-core";

export const statuses = pg.pgTable("statuses", {
    id: pg.serial("id").primaryKey().notNull(),
    user: pg.text("user").primaryKey().notNull(),
    contents: pg.text("contents").notNull(),
});

export const accounts = pg.pgTable("accounts", {
    user: pg.text("user").primaryKey().notNull(),
    pass: pg.text("pass").notNull() // I know this is not ideal, we can implement hashing later.
})