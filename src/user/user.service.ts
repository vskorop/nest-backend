import { Injectable } from '@nestjs/common';
import { eq, or } from 'drizzle-orm';
import { genSaltSync, hashSync } from 'bcryptjs';

import { DrizzleService } from 'src/db';
import { users, userRoles, roleEnum } from 'src/migrations/schema';

@Injectable()
export class UserService {
    constructor(private drizzleService: DrizzleService) { }

    async save(userData: typeof users.$inferInsert) {
        return await this.drizzleService.db.transaction(async (tx) => {
            const hashedPassword = this.hashPassword(userData.password)

            const existUser = await tx
                .select()
                .from(users)
                .where(eq(users.email, userData.email))
                .then(rows => rows[0])

            if (existUser) {
                const [updatedUser] = await tx
                    .update(users)
                    .set({ ...userData, email: existUser.email, password: hashedPassword })
                    .where(eq(users.email, userData.email))
                    .returning()

                return {
                    email: updatedUser.email,
                    id: updatedUser.id
                };
            }

            const [newUser] = await tx.insert(users).values({ ...userData, password: hashedPassword }).returning();

            await tx.insert(userRoles).values({
                userId: newUser.id,
                role: roleEnum.enumValues['USER'],
            } as { userId: string; role: 'USER' });

            return {
                email: newUser.email,
                id: newUser.id
            };
        });
    }

    async findAll() {
        return this.drizzleService.db.select().from(users);
    }

    async findFirst(idOrEmail: string, isUuid: boolean) {
        return await this.drizzleService.db
            .select()
            .from(users)
            .where(isUuid ? eq(users.id, idOrEmail) : eq(users.email, idOrEmail))
    }

    async deleteUser(id: string) {
        return await this.drizzleService.db
            .delete(users)
            .where(eq(users.id, id))
            .returning({ deletedId: users.id });
    }
    //hashPassword
    private hashPassword(password: string) {
        return hashSync(password, genSaltSync(10));
    }

}