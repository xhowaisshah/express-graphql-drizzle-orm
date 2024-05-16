import { configDotenv } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

configDotenv();
export default defineConfig({
  schema: './src/db/schema',
  out: './src/db/migrations',
  driver: 'pg',
  dbCredentials: {
    // connectionString: process.env.DATABASE_URL as string,
    host: '127.0.0.1',
    user: 'postgres',
    password: 'abc@123',
    database: 'graphql_db'
  },
  verbose: true,
  strict: true
});
