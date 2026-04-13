import pool from "@/lib/db";

export async function getPencatatanWajibBulanan(){
    const result = await pool.query("SELECT * FROM vw_pencatatanwajibbulanan")
    return result.rows
}