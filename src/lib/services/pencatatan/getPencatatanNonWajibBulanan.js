import pool from "@/lib/db";

export async function getPencatatanNonWajibBulanan(){
    const result = await pool.query("SELECT * FROM vw_pencatatannonwajibbulanan")
    return result.rows
}