import pool from "@/lib/db";

export async function getRiwayat(){
    const result = await pool.query("SELECT * FROM vw_riwayat")
    return result.rows
}