import pg from 'pg';
const { Client } = pg;

async function runSQL(dbName, sql) {
  const client = new Client({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD,
    database: dbName,
  });
  await client.connect();
  const res = await client.query(sql);
  await client.end();
  return res;
}

const createDbSql = `CREATE DATABASE tiasa_db;`;
const createTableSql = `
CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_name TEXT NOT NULL,
    student_grade INTEGER NOT NULL,
    english_experience TEXT NOT NULL,
    parent_name TEXT NOT NULL,
    whatsapp_number TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
`;

async function init() {
  try {
    console.log('Connecting to "postgres" database to ensure "tiasa_db" exists...');
    try {
      await runSQL('postgres', createDbSql);
      console.log('Database "tiasa_db" created successfully.');
    } catch (err) {
      if (err.message.includes('already exists')) {
        console.log('Database "tiasa_db" already exists.');
      } else {
        throw err;
      }
    }

    console.log('Connecting to "tiasa_db" to create "leads" table...');
    await runSQL('tiasa_db', createTableSql);
    console.log('Table "leads" created successfully!');

  } catch (err) {
    console.error('Migration failed:', err.message);
    if (err.message.includes('authentication failed')) {
      console.log('\nTIP: Please check your DB_PASSWORD in .env');
    }
  }
}

init();
