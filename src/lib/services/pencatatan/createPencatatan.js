import {sql} from "@/lib/db";

export async function createPencatatan(data){
    const {tanggal, id_kategori, jumlah} = data;

    const result = await sql
        `INSERT INTO tbl_pengeluaran (tanggal, id_kategori, jumlah) VALUES (${tanggal},${id_kategori},${jumlah}) RETURNING *`;


    return result[0]
}