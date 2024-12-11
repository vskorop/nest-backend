import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '../migrations/schema';
import 'dotenv/config';

@Injectable()
export class DrizzleService implements OnModuleInit, OnModuleDestroy {
    private pool: Pool;
    public db: ReturnType<typeof drizzle>;
    // const db = drizzle(process.env.DATABASE_URL!);
    constructor() {
        this.pool = new Pool({
            connectionString: process.env.DATABASE_URL,
            database: process.env.POSTGRES_DB
        });

        this.db = drizzle(this.pool, { schema });
    }

    async onModuleInit() {
        try {
            await this.pool.connect();
            console.log('Database connection established successfully');
        } catch (error) {
            console.error('Failed to connect to the database', error);
            throw error;
        }
    }

    async onModuleDestroy() {
        await this.pool.end();
        console.log('Database connection closed');
    }
}