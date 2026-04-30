import {sql} from "@/lib/db";

export async function editKategori(id, data){
    const {kategori, jenis} = data

    if(!kategori || !jenis){
        throw new Error("Semua kolom wajib diisi")
    }

    const result = await sql
        `UPDATE tbl_kategori SET kategori = ${kategori}, jenis = ${jenis} WHERE id_kategori = ${id} RETURNING *`;

    return result[0]
}