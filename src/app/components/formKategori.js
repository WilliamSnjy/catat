"use client"

import { useState } from "react"

export default function FormKategori({
    mode = "add",
    dataKategori = null,
    onClose,
    onSuccess
}){
    const [form, setForm] = useState({
        kategori: dataKategori?.kategori || "",
        jenis: dataKategori?.jenis ?? null,
    })

    const handleChange = (field, value) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const handleSubmit = async () => {
        try {
            const url =
                mode === "add" ? "/api/kategori" : `/api/kategori/${dataKategori.id_kategori}`
            const method = mode === "add" ? "POST" : "PUT"

            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            })

            if(res.ok){
                alert(mode === "add" ? "Berhasil tambah kategori" : "Berhasil edit kategori")
                onClose()
                onSuccess()
            }
        } catch (error) {
            console.error(error)
            alert(mode === "add" ? "Gagal tambah kategori" : "Gagal edit kategori")
        }
    }

    return (
        <>
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
                <div className="bg-white p-6 rounded-xl w-96">
                    <h2 className="text-xl font-bold mb-4">
                           {mode === "add" ? "Tambah" : "Edit"} Kategori
                    </h2>

                    <div className="flex flex-col gap-3">
                        <input
                            type="text"
                            value={form.kategori}
                            onChange={(e) => handleChange("kategori", e.target.value)}
                            className="border p-2 rounded"
                        />

                        <select
                            value={form.jenis === null ? "" : form.jenis.toString()}
                            onChange={(e) =>
                                handleChange("jenis", e.target.value === "true")
                            }
                            className="border p-2 rounded"
                        >
                            <option value="">Pilih Jenis</option>
                            <option value="true">Wajib</option>
                            <option value="false">Non Wajib</option>
                        </select>
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 rounded"
                        >
                            Batal
                        </button>
                        <button
                            onClick={handleSubmit} 
                            className="px-4 py-2 bg-green-500 text-white rounded"
                        >
                            Simpan
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}