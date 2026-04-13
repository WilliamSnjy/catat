import {sql} from "@/lib/db";

export async function deletePencatatan(id){
    const result = await sql
        `DELETE FROM tbl_pengeluaran WHERE id_pengeluaran = ${id}`;

    return result
}