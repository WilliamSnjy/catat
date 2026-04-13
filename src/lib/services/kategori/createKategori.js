import pool from "@/lib/db";

export async function createKategori(data){
    const {kategori, jenis} = data;

    const result = await pool.query(
        `INSERT INTO tbl_kategori (kategori, jenis) VALUES ($1,$2) RETURNING *`,
        [kategori, jenis]
    )

    return result.rows[0]
}