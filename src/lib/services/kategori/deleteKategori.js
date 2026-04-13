import {sql} from "@/lib/db";

export async function deleteKategori(id){
    const result = await sql
        `DELETE FROM tbl_kategori WHERE id_kategori = ${id}`;


    return result
}