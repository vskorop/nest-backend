import { Injectable } from '@nestjs/common';
import { eq, or } from 'drizzle-orm';
import { genSaltSync, hashSync } from 'bcryptjs';

import { DrizzleService } from 'src/db';
import { users, userRoles, roleEnum } from 'src/migrations/schema';

@Injectable()
export class UserService {
    constructor(private drizzleService: DrizzleService) { }

    async createUser(userData: typeof users.$inferInsert) {
        return await this.drizzleService.db.transaction(async (tx) => {
            // const hashedPassword = userData?.password ? this.hashPassword(userData.password) : null;

            const [newUser] = await tx.insert(users).values({ ...userData, password: userData.password }).returning();

            await tx.insert(userRoles).values({
                userId: newUser.id,
                role: roleEnum.enumValues['USER'],
            } as { userId: string; role: 'USER' });

            return newUser;
        });
    }

    async findAll() {
        return this.drizzleService.db.select().from(users);
    }

    async findOne(idOrEmail: string, isUuid: boolean) {
        return await this.drizzleService.db
            .select()
            .from(users)
            .where(isUuid ? eq(users.id, idOrEmail) : eq(users.email, idOrEmail))
    }

    async deleteUser(id: string) {
        return await this.drizzleService.db.delete(users).where(eq(users.id, id))
    }

    private hashPassword(password: string) {
        return hashSync(password, genSaltSync(10));
    }

}