import {sql} from "@/lib/db";

export async function editPencatatan(id, data){
    const {tanggal,id_kategori,jumlah} = data

    const result = await sql
        `UPDATE tbl_pengeluaran SET tanggal = ${tanggal}, id_kategori = ${id_kategori}, jumlah = ${jumlah} WHERE id_pengeluaran = ${id} RETURNING *`;

    return result
}