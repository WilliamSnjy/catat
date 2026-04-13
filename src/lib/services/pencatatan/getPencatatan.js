import pool from "@/lib/db";

export async function getPencatatan(){
    const result = await pool.query("SELECT * FROM vw_pencatatan order by tanggal desc")
    return result.rows
}