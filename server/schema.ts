import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";

import { createClient } from "@libsql/client";
import { InferSelectModel, InferInsertModel, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/libsql";

const createId = () => {
  return Math.floor(Math.random() * 100).toString();
};

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export const db = drizzle(client);

export const users = sqliteTable("users", {
  id: text("id")
    .primaryKey()
    .notNull()
    .$default(() => createId()),
  name: text("name").default("User Name"),
  email: text("email"),
  password: text("password"),
  createdAt: integer("created_at")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  updatedAt: integer("updated_at").$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
  accountId: text("account_id").references(() => accounts.id),
  isAdmin: integer("is_admin", { mode: "boolean" }).default(false),
});

export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;

export const accounts = sqliteTable("accounts", {
  id: text("id")
    .primaryKey()
    .notNull()
    .$default(() => createId()),
  name: text("name").default("Default Account"),
  createdAt: integer("created_at")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  updatedAt: integer("updated_at").$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
});

export type Account = InferSelectModel<typeof accounts>;
export type NewAccount = InferInsertModel<typeof accounts>;
