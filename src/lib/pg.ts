import { Pool } from 'pg';

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE || 'tiasa_db',
});

// Helper for parameterized queries
export const query = (text: string, params?: any[]) => pool.query(text, params);

export default pool;
