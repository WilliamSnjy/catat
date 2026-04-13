import {sql} from "@/lib/db";

export async function getPencatatanTotalBulanan(){
    const result = await sql
        `
        SELECT COALESCE(SUM(jumlah),0) as total
        FROM tbl_pengeluaran
        WHERE tanggal >= date_trunc('month', CURRENT_DATE)
        AND tanggal < date_trunc('month', CURRENT_DATE) + INTERVAL '1 month';
        `
    return result
}