import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.DATABASE_LOCAL_URL
});

export default pool;