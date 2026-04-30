import {sql} from "@/lib/db";

export async function createPencatatan(data){
    const {tanggal, id_kategori, jumlah} = data;

    if(!tanggal || !id_kategori || jumlah === undefined || jumlah === null){
        throw new Error("Semua kolom wajib diisi")
    }

    const parsedJumlah = Number(jumlah)

    if(isNaN(parsedJumlah) || parsedJumlah <= 0){
        throw new Error("jumlah tidak valid")
    }

    const result = await sql
        `INSERT INTO tbl_pengeluaran (tanggal, id_kategori, jumlah) VALUES (${tanggal},${id_kategori},${jumlah}) RETURNING *`;


    return result[0]
}