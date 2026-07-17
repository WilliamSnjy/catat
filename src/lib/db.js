import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";

neonConfig.webSocketConstructor = ws;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export default pool;

// "use server";
// import { neon } from "@neondatabase/serverless";

// export const sql = neon(process.env.DATABASE_URL);