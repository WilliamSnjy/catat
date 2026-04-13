import {sql} from "@/lib/db";

export async function getPencatatanHarian(){
    const result = await sql `select * from vw_pencatatan WHERE TO_DATE(tanggal, 'YYYY-MM-DD') = CURRENT_DATE`
    return result
}