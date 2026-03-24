import { Pool } from 'pg';

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE || 'tiasa_db',
};

if (!dbConfig.password && process.env.NODE_ENV === 'production') {
  console.warn('Postgres password is missing in production environment.');
}

const pool = new Pool(dbConfig);

// Helper for parameterized queries
export const query = (text: string, params?: unknown[]) => pool.query(text, params);

export default pool;
