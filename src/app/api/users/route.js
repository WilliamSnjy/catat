import {sql} from "@/lib/db";

export async function GET(){
    try{
        const result = await sql('SELECT * FROM tbl_user');

        return Response.json({
            status: 200,
            data: result.rows,
        })
    }catch (error){
        return Response.json({
            status: 500,
            error: error.message,
        })
    }
}