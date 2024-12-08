import { relations } from 'drizzle-orm';
import {
  text,
  boolean,
  timestamp,
  pgTable as table,
  pgEnum,
} from 'drizzle-orm/pg-core';
import { tokens } from './tokens';

import * as t from 'drizzle-orm/pg-core';

export const RoleEnum = pgEnum('role_enum', ['ADMIN', 'USER']);
export const ProviderEnum = pgEnum('providers', ['GOOGLE', 'YANDEX']);

export const users = table('users', {
  id: t.uuid('id').defaultRandom().primaryKey(),
  email: text('email').unique(),
  password: text('password').notNull(),
  provider: ProviderEnum().notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date()),
  isBlocked: boolean('is_blocked').default(false),
  roles: RoleEnum().notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  tokens: many(tokens),
}));
