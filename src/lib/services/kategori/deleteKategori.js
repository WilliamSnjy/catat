import pool from "@/lib/db";

export async function deleteKategori(id){
    const result = await pool.query(
        `DELETE FROM tbl_kategori WHERE id_kategori = $1`,
        [id]
    )

    return result.rows
}