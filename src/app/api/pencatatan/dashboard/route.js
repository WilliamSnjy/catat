import { getPencatatanHarian } from "@/lib/services/pencatatan/getPencatatanHarian";
import { getPencatatanBulanan } from "@/lib/services/pencatatan/getPencatatanBulanan";
import { getPencatatanWajibBulanan } from "@/lib/services/pencatatan/getPencatatanWajibBulanan";
import { getPencatatanNonWajibBulanan } from "@/lib/services/pencatatan/getPencatatanNonWajibBulanan";
import { getPencatatanPerKategori } from "@/lib/services/pencatatan/getPencatatanPerKategori";
import { getPencatatanTotalBulanan } from "@/lib/services/pencatatan/getPencatatanTotalBulanan";

export async function GET(){
    try{
        const [PH,PB,PWB,PNWB,PPK,PTB] = await Promise.all([
            getPencatatanHarian(),
            getPencatatanBulanan(),
            getPencatatanWajibBulanan(),
            getPencatatanNonWajibBulanan(),
            getPencatatanPerKategori(),
            getPencatatanTotalBulanan(),
        ])

        return Response.json({
            status: 200,
            data: {
                PH,
                PB,
                PWB,
                PNWB,
                PPK,
                PTB,
            }
        })
    }catch (error){
        return Response.json({
            status: 500,
            error: error.message,
        })
    }
}