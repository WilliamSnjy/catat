import pool from "@/lib/db";

export async function getPencatatanBulanan(){
    const result = await pool.query("select * from vw_pencatatanbulanan")
    return result.rows
}