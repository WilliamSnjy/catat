import { getPencatatan } from "@/lib/services/pencatatan/getPencatatan";
import { createPencatatan } from "@/lib/services/pencatatan/createPencatatan";

export async function GET(){
    try{
        const result = await getPencatatan()

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

export async function POST(request){
    try{
        const body = await request.json()
        const result = await createPencatatan(body)

        return Response.json({
            status: 201,
            message: "Pencatatan berhasil ditambahkan",
            data: result
        })
    } catch (error){
        return Response.json({
            status: 500,
            error: error.message
        })
    }
}