import pool from "@/lib/db";

export async function deletePencatatan(id){
    const result = await pool.query(
        `DELETE FROM tbl_pengeluaran WHERE id_pengeluaran = $1`,
        [id]
    )

    return result.rows
}