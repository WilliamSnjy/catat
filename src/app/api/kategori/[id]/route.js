import { editKategori } from "@/lib/services/kategori/editKategori";
import { deleteKategori } from "@/lib/services/kategori/deleteKategori";

export async function PUT(request, { params }){
    try{
        const {id} = await params
        const body = await request.json()

        const result = await editKategori(id, body)

        return Response.json({
            status: 201,
            message: "Kategori berhasil di edit",
            data: result
        })
    }catch (error){
        return Response.json({
            status: 500,
            error: error.message,
        })
    }
}

export async function DELETE(request, {params}){
    try{
        const {id} = await params
        
        await deleteKategori(id)

        return Response.json({
            message: "Kategori berhasil dihapus",
        },
        {
            status: 201,
        })
    }catch (error){
        return Response.json({
            message: error.message,
        },{
            status: 409,
        })
    }
}