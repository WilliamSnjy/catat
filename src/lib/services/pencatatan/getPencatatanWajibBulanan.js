import {sql} from "@/lib/db";

export async function getPencatatanWajibBulanan(){
    const result = await sql `SELECT * FROM vw_pencatatanwajibbulanan`
    return result
}