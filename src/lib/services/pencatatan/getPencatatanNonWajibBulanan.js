import {sql} from "@/lib/db";

export async function getPencatatanNonWajibBulanan(){
    const result = await sql `SELECT * FROM vw_pencatatannonwajibbulanan`
    return result
}