import { editPencatatan } from "@/lib/services/pencatatan/editPencatatan";
import { deletePencatatan } from "@/lib/services/pencatatan/deletePencatatan";

export async function PUT(request, {params}){
    try{
        const {id} = await params
        const body = await request.json()

        const result = await editPencatatan(id, body)

        return Response.json({
            status: 201,
            message: "Pencatatan berhasil di edit",
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
        
        await deletePencatatan(id)

        return Response.json({
            status: 201,
            message: "Kategori berhasil dihapus",
        })
    }catch (error){
        return Response.json({
            status: 500,
            error: error.message,
        })
    }
}