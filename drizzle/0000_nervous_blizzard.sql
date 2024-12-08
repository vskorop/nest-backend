CREATE TYPE "public"."providers" AS ENUM('GOOGLE', 'YANDEX');--> statement-breakpoint
CREATE TYPE "public"."role_enum" AS ENUM('ADMIN', 'USER');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tokens" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"token" text NOT NULL,
	"exp" timestamp NOT NULL,
	"user_id" uuid NOT NULL,
	"user_agent" text NOT NULL,
	CONSTRAINT "tokens_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text,
	"password" text NOT NULL,
	"provider" "providers" NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"is_blocked" boolean DEFAULT false,
	"roles" "role_enum" NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tokens" ADD CONSTRAINT "tokens_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "tokens_token_user_id_index" ON "tokens" USING btree ("token","user_id");