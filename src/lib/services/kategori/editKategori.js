import pool from "@/lib/db";

export async function editKategori(id, data){
    const {kategori, jenis} = data

    if(!kategori || !jenis){
        throw new Error("Semua kolom wajib diisi")
    }

    const result = await pool.query(
        `UPDATE tbl_kategori SET kategori = $1, jenis = $2 WHERE id_kategori = $3 RETURNING *`,
        [kategori, jenis, id]
    )

    return result.rows[0]
}