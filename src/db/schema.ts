import { 
    pgTable, 
    uuid, 
    text, 
    timestamp, 
    boolean, 
    pgEnum 
  } from 'drizzle-orm/pg-core';
  
  // Enum for Role
  export const roleEnum = pgEnum('role', ['ADMIN', 'USER']);
  
  // Enum for Provider
  export const providerEnum = pgEnum('provider', ['GOOGLE', 'YANDEX']);
  
  // Users Table
  export const users = pgTable('users', {
    id: uuid('id').primaryKey().defaultRandom(),
    email: text('email').unique().notNull(),
    password: text('password'),
    provider: providerEnum('provider'),
    createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date()),
    isBlocked: boolean('is_blocked').default(false)
  });
  
  // Tokens Table
  export const tokens = pgTable('tokens', {
    token: text('token').unique().notNull(),
    exp: timestamp('exp').notNull(),
    userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
    userAgent: text('user_agent').notNull()
  });
  
  // User to Role Relation Table
  export const userRoles = pgTable('user_roles', {
    userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
    role: roleEnum('role').notNull()
  });