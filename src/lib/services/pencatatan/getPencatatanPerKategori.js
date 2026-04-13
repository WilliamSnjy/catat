import {sql} from "@/lib/db";

export async function getPencatatanPerKategori(){
    const result = await sql `SELECT * FROM vw_pencatatanperkategori`
    return result
}