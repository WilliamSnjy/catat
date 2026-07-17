import pool from "@/lib/db";

export async function getPencatatanPerKategori(){
    const result = await pool.query("SELECT * FROM vw_pencatatanperkategori")
    return result.rows
}