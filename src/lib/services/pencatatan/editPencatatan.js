import {sql} from "@/lib/db";

export async function editPencatatan(id, data){
    const {tanggal,id_kategori,jumlah} = data

    if(!tanggal || !id_kategori || jumlah === undefined || jumlah === null){
        throw new Error("Semua kolom wajib diisi")
    }

    const parsedJumlah = Number(jumlah)

    if(isNaN(parsedJumlah) || parsedJumlah <= 0){
        throw new Error("jumlah tidak valid")
    }

    const result = await sql
        `UPDATE tbl_pengeluaran SET tanggal = ${tanggal}, id_kategori = ${id_kategori}, jumlah = ${jumlah} WHERE id_pengeluaran = ${id} RETURNING *`;

    return result
}