import pool from "@/lib/db";

export async function getKategori(){
    const result = await pool.query(
        `SELECT * FROM tbl_kategori`
    )
    
    return result.rows
}