import { InferSelectModel, relations } from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';

export const users = pgTable('users', {
  id: serial("id").primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  createdAt: timestamp("createdAt").defaultNow()
});

export const posts = pgTable("posts",{
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  authorId: integer("authorId").references(()=> users.id),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow()
});

export const comments = pgTable("comments",{
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  postId: integer("postId").references(() => posts.id),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow()
});

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts)
}));

export const postsRelations = relations(posts, ({ one, many }) => ({
  author: one(users,{
    fields: [posts.authorId],
    references: [users.id]
  }),
  comments: many(comments)
}));

export const commentsRelations = relations(comments, ({ one }) => ({
  post: one(posts,{
    fields: [comments.postId],
    references: [posts.id]
  })
}));

export type Users = InferSelectModel<typeof users>;

export const userSchema = createInsertSchema(users, {
  email: (schema) => schema.email.email({ message: 'Email is not valid' }),
  name: (schema) => schema.name.min(3, { message: 'Name must be at least 3 characters' }),
});

