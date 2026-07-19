import pool from "@/lib/db";

export async function GET(){
    try{
        const result = await pool.query('SELECT * FROM tbl_user');

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