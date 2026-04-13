import {sql} from "@/lib/db";

export async function getPencatatan(){
    const result = await sql`SELECT * FROM vw_pencatatan order by tanggal desc`
    return result
}