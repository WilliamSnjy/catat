import {sql} from "@/lib/db";

export async function getPencatatanBulanan(){
    const result = await sql`select * from vw_pencatatanbulanan`
    return result
}