import {sql} from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request){
    try{
    const {username,password} = await request.json()

    const result = await sql
        `SELECT * FROM tbl_user WHERE username = ${username}`;

    const user = result[0]

    if(!user) {
        return NextResponse.json({
            status: 401,
            message: "username tidak ditemukan"
        })
    }

    if(user.password !== password){
        return NextResponse.json({
            status: 401,
            message: "password salah"
        })
    }

    const response = NextResponse.json({
        message: "Login berhasil"
    })

    response.cookies.set("token", user.id_user, {
        httpOnly: true,
        path: "/"
    })

    return response
    }catch (error){
        return NextResponse.json({
            status: 500,
            error: error.message,
        })
    }
}