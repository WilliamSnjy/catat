import {sql} from "@/lib/db";

export async function getKategori(){
    const result = await sql
        `SELECT * FROM tbl_kategori`
  
    return result
}