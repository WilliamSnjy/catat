import { getPencatatan } from "@/lib/services/pencatatan/getPencatatan";
import { createPencatatan } from "@/lib/services/pencatatan/createPencatatan";

export async function GET(req){
    try{
        const { searchParams } = new URL(req.url)

        const bulan = searchParams.get("bulan")
        const kategori = searchParams.get("kategori")

        const page = Number(searchParams.get("page")) || 1
        const limit = Number(searchParams.get("limit")) || 10

        const offset = (page - 1) * limit

        const result = await getPencatatan(bulan, kategori, limit, offset)

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