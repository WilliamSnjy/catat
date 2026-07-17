import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.DATABASE_LOCAL_URL
});

export default pool;

// "use server";
// import { neon } from "@neondatabase/serverless";

// export const sql = neon(process.env.DATABASE_URL);