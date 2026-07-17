import pool from "@/lib/db";

export async function createPencatatan(data){
    const {tanggal, id_kategori, jumlah} = data;

    if(!tanggal || !id_kategori || jumlah === undefined || jumlah === null){
        throw new Error("Semua kolom wajib diisi")
    }

    const parsedJumlah = Number(jumlah)

    if(isNaN(parsedJumlah) || parsedJumlah <= 0){
        throw new Error("jumlah tidak valid")
    }

    const result = await pool.query(
        `INSERT INTO tbl_pengeluaran (tanggal, id_kategori, jumlah) VALUES ($1,$2,$3) RETURNING *`,
        [tanggal, id_kategori, jumlah]
    )

    return result.rows[0]
}