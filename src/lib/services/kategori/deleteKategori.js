import pool from "@/lib/db";

export async function deleteKategori(id){
    const checkData = await pool.query(
        `SELECT 1 FROM tbl_pengeluaran WHERE id_kategori = $1 LIMIT 1`,
        [id]
    )

    if (checkData.rows.length === 0){
        const result = await pool.query(
            `DELETE FROM tbl_kategori WHERE id_kategori = $1`,
            [id]
        )

        return result.rows
    }else{
        throw new Error("Masih ada data untuk kategori ini, mohon dihapus terlebih dahulu")
    }
}