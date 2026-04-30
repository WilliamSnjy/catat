import {sql} from "@/lib/db";

export async function deleteKategori(id){
    const checkData = await sql
        `SELECT 1 FROM tbl_pengeluaran WHERE id_kategori = ${id} LIMIT 1`

    if (checkData.rows.length === 0){
        const result = await sql
            `DELETE FROM tbl_kategori WHERE id_kategori = ${id}`;

        return result
    }else {
        throw new Error("Masih ada data untuk kategori ini, mohon dihapus terlebih dahulu")
    }

}