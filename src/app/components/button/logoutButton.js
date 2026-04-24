"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import Status from "../ui/status"

export default function LogoutButton() {
    const router = useRouter()

    const [status, setStatus] = useState({
        open: false,
        status: "loading",
        message: "",
    })

    const handleLogout = async () => {
        setStatus({
            open: true,
            status: "loading",
            message: "sedang mengeluarkan anda..."
        })

        const res = await fetch("/api/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })

        if(res.ok){
            setStatus({
                open: true,
                status: "success",
                message: "Berhasil Logout"
            })
            setTimeout(() => {
                router.push("/login")
            }, 1500)
        }
    }

    return (
        <>
            <button onClick={handleLogout}>
                Logout
            </button>
            <Status
                open={status.open}
                status={status.status}
                message={status.message}
            />
        </>
    )
}