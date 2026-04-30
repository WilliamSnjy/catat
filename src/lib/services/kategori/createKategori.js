import {sql} from "@/lib/db";

export async function createKategori(data){
    const {kategori, jenis} = data;

    if(!kategori || !jenis){
        throw new Error("Semua kolom wajib diisi")
    }

    const result = await sql
        `INSERT INTO tbl_kategori (kategori, jenis) VALUES (${kategori},${jenis}) RETURNING *`;

    return result[0]
}