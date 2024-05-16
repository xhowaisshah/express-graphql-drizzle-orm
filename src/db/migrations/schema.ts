import { pgTable, serial, text, integer, timestamp, foreignKey } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"



export const posts = pgTable("posts", {
	id: serial("id").primaryKey().notNull(),
	title: text("title").notNull(),
	content: text("content").notNull(),
	authorId: integer("authorId"),
});

export const users = pgTable("users", {
	id: serial("id").primaryKey().notNull(),
	name: text("name").notNull(),
	email: text("email").notNull(),
	createdAt: timestamp("createdAt", { mode: 'string' }).defaultNow(),
});

export const comments = pgTable("comments", {
	id: serial("id").primaryKey().notNull(),
	content: text("content").notNull(),
	postId: integer("postId").references(() => posts.id),
	createdAt: timestamp("createdAt", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updatedAt", { mode: 'string' }).defaultNow(),
});