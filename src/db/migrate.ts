import { Pool } from 'pg';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres';

async function main() {
  const pool = new Pool({ 
    // connectionString: process.env.DATABASE_URL
    host: '127.0.0.1',
    user: 'postgres',
    password: 'abc@123',
    database: 'graphql_db'
 });    
  const db: NodePgDatabase = drizzle(pool);
  
  console.log('[migrate] Running migrations ...');
  
  await migrate(db, { migrationsFolder: 'src/db/migrations' });
  
  console.log('[migrate] All migrations have been ran, exiting ...');
  
  await pool.end();
}

main();