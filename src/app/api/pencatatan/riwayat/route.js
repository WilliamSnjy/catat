import { getRiwayat } from "@/lib/services/riwayat/getRiwayat"

export async function GET(){
    try{
        const result = await getRiwayat()

        return Response.json({
            status: 200,
            data: result
        })
    }catch (error){
        return Response.json({
            status: 500,
            error: error.message,
        })
    }
}