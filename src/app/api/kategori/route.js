import { getKategori } from "@/lib/services/kategori/getKategori";
import { createKategori } from "@/lib/services/kategori/createKategori";

export async function GET(){
    try{
        const result = await getKategori()

        return Response.json({
            status: 200,
            data: result,
        })
    }catch (error){
        return Response.json({
            status: 500,
            error: error.message,
        })
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const result = await createKategori(body)

        return Response.json({
            status: 201,
            message: "Kategori berhasil ditambahkan",
            data: result,
        });
    } catch (error) {
        return Response.json({
            status: 500,
            error: error.message,
        });
    }
}