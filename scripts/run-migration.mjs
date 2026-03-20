import pg from 'pg';
import fs from 'fs';
import path from 'path';

const { Client } = pg;

async function run() {
  const client = new Client({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE || 'tiasa_db',
  });

  try {
    await client.connect();
    console.log('Connected to database.');
    
    const sqlPath = path.join(process.cwd(), 'db', 'phase3_init.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');
    
    console.log('Executing SQL script...');
    await client.query(sql);
    console.log('SQL script executed successfully.');
  } catch (err) {
    console.error('Error executing SQL script:', err);
    process.exit(1);
  } finally {
    await client.end();
  }
}

run();
