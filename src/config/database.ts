import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const connectDB = async () => {
  try {
    await pool.connect();
    console.log('PostgreSQL connected');
  } catch (err) {
    console.error('PostgreSQL connection error:', err);
    process.exit(1);
  }
};

export default {
  query: (text: string, params?: any[]) => pool.query(text, params),
};
