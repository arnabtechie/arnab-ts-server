import { Pool } from 'pg';
import { DB_HOST, DB_NAME, DB_PORT, DB_USER, DB_PASS } from '../config/config.dev';

export const pool = new Pool({
  host: DB_HOST,
  database: DB_NAME,
  port: Number(DB_PORT),
  user: DB_USER,
  password: DB_PASS,
  ssl: {
    rejectUnauthorized: false,
  },
});

export const testConnection = async () => {
  try {
    const client = await pool.connect();
    console.log('Database connection successful');
    client.release();
  } catch (err) {
    console.error('Database connection error:', err);
  }
};
