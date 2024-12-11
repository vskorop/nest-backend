import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

import { DrizzleService } from 'src/db';
import { users } from 'src/migrations/schema';

@Injectable()
export class UserService {
    constructor(private drizzleService: DrizzleService) { }

    async insert(userData: typeof users.$inferInsert) {
        return this.drizzleService.db.insert(users).values(userData).returning();
    }

    async findAll() {
        return this.drizzleService.db.select().from(users);
    }

    async findByEmail(email: string) {
        return this.drizzleService.db
            .select()
            .from(users)
        // .where(eq(users.email, email))
    }
}