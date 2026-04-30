"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Status from "./ui/status"

export default function FormPencatatan({
    mode="add",
    dataPencatatan = null,
    onClose,
    listKategori
}) {
    const router = useRouter()

    const [status, setStatus] = useState({
        open: false,
        status: "loading",
        message: "",
    })    

    const [form, setForm] = useState({
        tanggal: dataPencatatan?.tanggal || "",
        id_kategori: dataPencatatan?.id_kategori || "",
        jumlah: dataPencatatan?.jumlah || "",
    })

    const handleChange = (field, value) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const handleSubmit = async () => {
        if(!form.tanggal || !form.id_kategori || !form.jumlah){
            setStatus({
                open: true,
                status: "error",
                message: "Semua kolom wajib diisi"
            })
            setTimeout(() => {
                setStatus((prev) => ({ ...prev, open: false }))
            }, 2000)
            return
        }

        if(Number(form.jumlah) < 0){
            setStatus({
                open: true,
                status: "error",
                message: "Jumlah harus lebih dari 0"
            })
            setTimeout(() => {
                setStatus((prev) => ({ ...prev, open: false }))
            }, 2000)
            return
        }

        setStatus({
            open: true,
            status: "loading",
            message: (mode === "add" ? "sedang menyimpan data..." : "sedang mengupdate data...")
        })
        try {
            const url =
                mode === "add" ? "/api/pencatatan" : `/api/pencatatan/${dataPencatatan.id_pengeluaran}`
            
            const method = mode === "add" ? "POST" : "PUT"

            const payload = {
                ...form,
                jumlah: Number(form.jumlah)
            }

            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            })

            if(res.ok){
                setStatus({
                    open: true,
                    status: "success",
                    message: (mode === "add" ? "data berhasil tersimpan" : "data berhasil terupdate")
                })
                setTimeout(() => {
                    onClose()
                    router.refresh()
                }, 1500)
            }
        }catch (error){
            setStatus({
                open: true,
                status: "error",
                message: (mode === "add" ? "data gagal tersimpan" : "data gagal terupdate")
            })
            setTimeout(() => {
                setStatus((prev) => ({ ...prev, open: false }))
            }, 2000)
        }
    }

    return (
        <>
            {!status.open && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-xl w-96">
                        <h2 className="text-xl font-bold mb-4">
                            {mode === "add" ? "Tambah" : "Edit"} Pengeluaran
                        </h2>

                        <div className="flex flex-col gap-3">
                            <input
                                type="date"
                                value={form.tanggal}
                                onChange={(e) => handleChange("tanggal", e.target.value)}
                                className="border p-2 rounded"
                            />

                            <select                                
                                value={form.id_kategori}
                                onChange={(e) => handleChange("id_kategori", e.target.value)}
                                className="border p-2 rounded"
                            >
                                <option value="">Pilih Kategori</option>
                                {listKategori.map((item) => (
                                    <option
                                        key={item.id_kategori}
                                        value={item.id_kategori}
                                    >
                                        {item.kategori}
                                    </option>
                                ))}
                            </select>

                            <input 
                                type="number"
                                min="0"
                                value={form.jumlah}
                                onChange={(e) => handleChange("jumlah", e.target.value)}
                                className="border p-2 rounded"
                                placeholder="Nominal"
                            />
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
                                className="px-4 py-2 bg-green-500 text-white rounded">
                                Simpan
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <Status
                open={status.open}
                status={status.status}
                message={status.message}
            />
        </>
    )
}