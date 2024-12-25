import {
  pgTable,
  uuid,
  text,
  timestamp,
  boolean,
  pgEnum
} from 'drizzle-orm/pg-core';

export const roleEnum = pgEnum('role', ['ADMIN', 'USER']);

export const providerEnum = pgEnum('provider', ['GOOGLE', 'YANDEX']);

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').unique().notNull(),
  password: text('password').notNull(),
  provider: providerEnum('provider').notNull().default('GOOGLE'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().$onUpdate(() => new Date()),
  isBlocked: boolean('is_blocked').default(false).notNull()
});

export const tokens = pgTable('tokens', {
  token: text('token').unique().notNull(),
  exp: timestamp('exp').notNull(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  userAgent: text('user_agent').notNull()
});

export const userRoles = pgTable('user_roles', {
  userId: uuid('user_id').primaryKey().references(() => users.id, { onDelete: 'cascade' }),
  role: roleEnum('role').default('USER').notNull()
});