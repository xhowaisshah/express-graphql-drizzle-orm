import { Pool } from 'pg';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { configDotenv } from 'dotenv';

configDotenv();
if(!process.env.DATABASE_URL) {
    console.log(process.env.DATABASE_URL, 'db url');
    throw new Error('DATABASE_URL is not set');
}

const pool = new Pool({
    // connectionString: process.env.DATABASE_URL,
    host: '127.0.0.1',
    user: 'postgres',
    password: 'abc@123',
    database: 'graphql_db'
});

export const db: NodePgDatabase = drizzle(pool);