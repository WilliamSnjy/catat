import pool from "@/lib/db";

export async function createPencatatan(data){
    const {tanggal, id_kategori, jumlah} = data;

    const result = await pool.query(
        `INSERT INTO tbl_pengeluaran (tanggal, id_kategori, jumlah) VALUES ($1,$2,$3) RETURNING *`,
        [tanggal, id_kategori, jumlah]
    )

    return result.rows[0]
}