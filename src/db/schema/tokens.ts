import {
  primaryKey,
  pgTable as table,
  text,
  timestamp,
  uniqueIndex,
} from 'drizzle-orm/pg-core';
import { users } from './users';
import { relations } from 'drizzle-orm';

import * as t from 'drizzle-orm/pg-core';

export const tokens = table(
  'tokens',
  {
    id: t.uuid('id').primaryKey().defaultRandom(), // Guaranteed single primary key
    token: text('token').notNull().unique(),
    exp: timestamp('exp').notNull(),
    userId: t
      .uuid('user_id')
      .references(() => users.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      })
      .notNull(),
    userAgent: text('user_agent').notNull(),
  },
  (tokens) => ({
    // Optional unique constraint
    uniqueTokenUser: uniqueIndex().on(tokens.token, tokens.userId),
  }),
);

export const tokensRelations = relations(tokens, ({ one }) => ({
  user: one(users, {
    fields: [tokens.userId],
    references: [users.id],
  }),
}));
