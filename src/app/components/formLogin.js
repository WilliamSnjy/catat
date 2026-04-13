"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function FormLogin(){
    const router = useRouter()

    const [form, setForm] = useState({
        username: "",
        password: "",
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    }

    const handleLogin = async (e) => {

        e.preventDefault();
        const res = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        })

        const data = await res.json()

        if(res.ok){
            alert("Login Berhasil")
            router.push("/")
        }else {
          alert(data.message)
        }
    }
    return (
    <form
        onSubmit={handleLogin}
        className="p-6 border rounded-lg shadow-md w-80"
    >
        <h1 className="text-xl font-bold mb-4">Login</h1>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Login
        </button>
    </form>
    )
}