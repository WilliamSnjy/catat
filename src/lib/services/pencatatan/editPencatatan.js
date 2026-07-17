import pool from "@/lib/db";

export async function editPencatatan(id, data){
    const {tanggal,id_kategori,jumlah} = data

    if(!tanggal || !id_kategori || jumlah === undefined || jumlah === null){
        throw new Error("Semua kolom wajib diisi")
    }

    const parsedJumlah = Number(jumlah)

    if(isNaN(parsedJumlah) || parsedJumlah <= 0){
        throw new Error("jumlah tidak valid")
    }

    const result = await pool.query(
        `UPDATE tbl_pengeluaran SET tanggal = $1, id_kategori = $2, jumlah = $3 WHERE id_pengeluaran = $4 RETURNING *`,
        [tanggal, id_kategori, jumlah, id]
    )

    return result.rows[0]
}