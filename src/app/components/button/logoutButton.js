"use client"

import { useRouter } from "next/navigation"

export default function LogoutButton() {
    const router = useRouter()

    const handleLogout = async () => {
        const res = await fetch("/api/logout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        })

        if(res.ok){
        alert("Logout berhasil")
        router.push("/login")
        }
    }

    return (
        <button onClick={handleLogout}>
            Logout
        </button>
    )
}